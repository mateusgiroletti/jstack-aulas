/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";

import PropTypes from "prop-types";

import arrow from "../../../../assets/icons/arrow.svg";
import edit from "../../../../assets/icons/edit.svg";
import trash from "../../../../assets/icons/trash.svg";

import { Card, ListContainer } from "./styles";
import { memo } from "react";

function ContactList({
    filteredContacts,
    orderBy,
    onToggleOrderBy,
    onDeleteContact
}) {
    return (
        <>
            {filteredContacts.length > 0 && (
                <ListContainer orderBy={orderBy}>
                    <button type="button" onClick={onToggleOrderBy}>
                        <span>Nome</span>
                        <img src={arrow} alt="Arrow" />
                    </button>
                </ListContainer>
            )}

            {filteredContacts.map((contact) => (
                <Card key={contact.id}>
                    <div className="info">
                        <div className="contact-name">
                            <strong>{contact.name}</strong>
                            {contact.category.name && (
                                <small>{contact.category.name}</small>
                            )}
                        </div>
                        <span>{contact.email}</span>
                        <span>{contact.phone}</span>
                    </div>

                    <div className="actions">
                        <Link to={`/edit/${contact.id}`}>
                            <img src={edit} alt="Edit" />
                        </Link>
                        <button
                            type="button"
                            onClick={() => onDeleteContact(contact)}
                        >
                            <img src={trash} alt="Delete" />
                        </button>
                    </div>
                </Card>
            ))}
        </>
    );
}

ContactList.propTypes = {
    filteredContacts: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string,
        phone: PropTypes.string,
        category: PropTypes.shape({
            name: PropTypes.string
        }),
    })).isRequired,
    orderBy: PropTypes.string.isRequired,
    onToggleOrderBy: PropTypes.func.isRequired,
    onDeleteContact: PropTypes.func.isRequired,
};

export default memo(ContactList);