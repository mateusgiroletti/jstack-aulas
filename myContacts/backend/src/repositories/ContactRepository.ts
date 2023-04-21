import query from "../database";

type ContactsProps = {
    id?: string;
    name: string;
    email: string;
    phone: string;
    categoryId: string;
}

class ContactsRepository {
    async findAll(orderBy = "ASC") {
        const direction = orderBy.toUpperCase() === "DESC" ? "DESC" : "ASC";
        const rows = await query(`
        SELECT cont.*, cat.name AS categoryName
        FROM contacts as cont
        LEFT JOIN categories as cat ON cat.id = cont.categoryId
        ORDER BY cont.name ${direction}`);
        return rows;
    }

    async findById(id: string) {
        const [row] = await query(`
        SELECT cont.*, cat.name AS categoryName
        FROM contacts as cont
        LEFT JOIN categories as cat ON cat.id = cont.categoryId
        WHERE cont.id = $1`, [id]);
        return row;
    }

    async findByEmail(email: string) {
        const [row] = await query("SELECT * FROM contacts WHERE email = $1", [email]);
        return row;
    }

    async delete(id: string) {
        const [row] = await query("DELETE FROM contacts WHERE id = $1", [id]);
        return row;
    }

    async create({ name, email, phone, categoryId }: ContactsProps) {
        const [row] = await query(`
            INSERT INTO contacts(name, email, phone, categoryId)
            VALUES($1, $2, $3, $4)
            RETURNING *
        `, [name, email, phone, categoryId]);

        return row;
    }

    async upadte(id: string, { name, email, phone, categoryId }: ContactsProps) {
        const [row] = await query(`
            UPDATE contacts
            SET name = $1, email = $2, phone = $3, categoryId = $4
            WHERE id = $5
            RETURNING *
        `, [name, email, phone, categoryId, id]);
        return row;
    }
}

export default new ContactsRepository();