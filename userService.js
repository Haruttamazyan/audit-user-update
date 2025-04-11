import { runQuery, runTransaction } from './db.js';

export const updateUser = async (userId, data, adminId) => {
    try {
        return await runTransaction(async (client) => {
            const oldUser = await getUserById(userId, client);

            await updateUserQuery(userId, data, client);

            const auditLogs = getSensitiveFieldChanges(oldUser, data, userId, adminId);

            if (auditLogs.length > 0) {
                await insertAuditLogs(auditLogs, client);

                return {
                    message: `User updated successfully. Audit logs recorded for: ${auditLogs.map(log => log.field).join(', ')}`,
                    auditLogCount: auditLogs.length
                };
            }

            return { message: 'User updated successfully' };
        });
    } catch (error) {
        throw new Error(error.message || 'Unexpected error occurred');
    }
};

const getUserById = async (userId, client) => {
    const result = await runQuery(
        'SELECT * FROM Users WHERE userId = $1',
        [userId],
        client
    );

    if (result.rows.length === 0) {
        throw new Error('User not found');
    }

    return result.rows[0];
};

const updateUserQuery = async (userId, data, client) => {
    const keys = Object.keys(data);
    const values = Object.values(data);

    const setClause = keys.map((key, index) => `"${key}" = $${index + 1}`).join(', ');
    const query = `
        UPDATE Users
        SET ${setClause}
        WHERE userId = $${keys.length + 1}
    `;

    await runQuery(query, [...values, userId], client);
};

const getSensitiveFieldChanges = (oldData, newData, userId, adminId) => {
    const sensitiveFields = (process.env.SENSITIVE_FIELDS || '').split(',').map(f => f.trim());

    return sensitiveFields
        .filter(field =>
            field in newData &&
            newData[field] !== undefined &&
            newData[field] !== oldData[field]
        )
        .map(field => ({
            userId: Number(userId),
            field,
            old_value: oldData[field],
            new_value: newData[field],
            adminId: Number(adminId)
        }));
};

const insertAuditLogs = async (logs, client) => {
    const query = `
        INSERT INTO user_audit_logs (user_id, field, old_value, new_value, admin_id)
        VALUES ($1, $2, $3, $4, $5)
    `;

    for (const log of logs) {
        await runQuery(query, [
            log.userId,
            log.field,
            log.old_value,
            log.new_value,
            log.adminId
        ], client);
    }
};

export const getAllUsers = async () => {
    return await runQuery('select * from Users')
}