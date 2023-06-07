class ContactMapper {
    toPersistence(domainContact) {
        return {
            id: domainContact.id,
            name: domainContact.name,
            email: domainContact.email,
            phone: domainContact.phone,
            categoryId: domainContact.categoryId
        };
    }

    toDomain(persistenceContact) {
        return {
            id: persistenceContact.id,
            name: persistenceContact.name,
            email: persistenceContact.email,
            phone: persistenceContact.phone,
            category: {
                id: persistenceContact.categoryid,
                name: persistenceContact.categoryname
            }
        };
    }
}

export default new ContactMapper();