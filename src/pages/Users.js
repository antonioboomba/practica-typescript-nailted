import axios from 'axios';
import React, { useEffect, useState } from 'react';
import fs from 'fs';
import helpers from '../helpers/helpers';
import _ from "lodash";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faSortAlphaAsc, faSortAlphaDesc, faSortAsc, faSortDesc } from '@fortawesome/free-solid-svg-icons'

const pageSize = 10;
const Users = () => {
    const [users, setUsers] = useState();
    const [paginatedUsers, setPaginatedUsers] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [usersTable, setUsersTable] = useState([]);
    const [search, setSearch] = useState("");
    const [data, setData] = useState();
    const [order, setOrder] = useState('ASC');
    const [icon, setIcon] = useState();
    const [addFormData, setAddFormData] = useState();
    const [contacts, setContacts] = useState();

    useEffect(() => {
        axios.get('http://localhost:3000/users.txt')
            .then(res => {
                setUsers(helpers.formatData(res));
                setUsersTable(helpers.formatData(res));
                setPaginatedUsers(_(helpers.formatData(res)).slice(0).take(pageSize).value())
            })

    }, []);


    const pageCount = users ? Math.ceil(users.length / pageSize) : 0;
    if (pageCount === 1) return null;
    const pages = _.range(1, pageCount + 1)



    const serchTerm = (term) => {
        return function (x) {
            return x.mail.includes(term) || term;
        }
    }



    const pagination = (pageNo) => {
        setCurrentPage(pageNo);
        const startIndex = (pageNo - 1) * pageSize;
        const paginatedUser = _(users).slice(startIndex).take(pageSize).value();
        setPaginatedUsers(paginatedUser);
    }

    const handleChange = e => {
        setSearch(e.target.value);
        filtrar(e.target.value);
        console.log(e.target.value);
        if (e.target.value === '') pagination(1);

    }

    const filtrar = (termSearch) => {
        var resSearch = usersTable.filter((el) => {
            if (el.mail.toString().toLowerCase().includes(termSearch.toLowerCase())) {
                return el;
            }
        })
        setPaginatedUsers(resSearch);

    }

    const handleAddFormChange = (event) => {
        event.preventDefault();
        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;
        const newFormData = { ...addFormData };
        newFormData[fieldName] = fieldValue;
        setAddFormData(newFormData);
        console.log(addFormData);
    }


    const handleAddFormSubmit = (event) => {

        var id = helpers.calculateId(users);
        console.log(id);

        event.preventDefault();
        console.log(addFormData);
        const newContact = {
            id: id,
            name: addFormData.name,
            address: addFormData.address,
            phone: addFormData.phone,
            mail: addFormData.mail,
            date: addFormData.date
        }
        console.log(
            newContact
        );

        const newContacts = [...contacts, newContact];
        setContacts(newContacts);
        console.log(newContacts);
    }




    const sorting = (col) => {
        console.log(order);
        if (order === "ASC") {
            setIcon(faCoffee);
            const sorted = [...users].sort((a, b) => a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1);
            setPaginatedUsers(sorted)

            setOrder("DSC");

        } if (order === "DSC") {
            const sorted = [...users].sort((a, b) => a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1);
            setPaginatedUsers(sorted)
            setOrder("ASC");
            pagination(1);


        }
    }

    return <div>
        <div className='containerInput'>
            <input
                className='form-control inputSearch'
                value={search}
                onChange={handleChange}
                placeholder="Search by mail"
            />
        </div>




        {
            !paginatedUsers ? ("No data found") : (
                <table className='table table-sm table-bordered'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th onClick={() => sorting("name")}>
                                {(() => {
                                    if (order == 'ASC') {
                                        return <FontAwesomeIcon icon={faSortAlphaAsc} />

                                    } else {
                                        return <FontAwesomeIcon icon={faSortAsc} />

                                    }
                                })()}

                                Name


                            </th>
                            <th >Surname</th>
                            <th >Address</th>
                            <th>Phone</th>
                            <th >Mail</th>
                            <th>Birthdate</th>
                        </tr>
                    </thead>

                    <tbody>

                        {
                            paginatedUsers.map((user, i) => (
                                <tr key={i}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.surname}</td>
                                    <td>{user.address.slice(1, -1)}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.mail}</td>
                                    <td>{user.birthdate}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>



            )}

        <nav className='d-flex justify-content-center'>
            <ul className='pagination'>
                {
                    pages.map((page) => (
                        <li className={
                            page === currentPage ? "page-item active" : "page-item"
                        }>
                            <p className="page-link" onClick={() => pagination(page)}>{page}</p>
                        </li>
                    ))
                }
            </ul>
        </nav>
        <h2>Add a Contact</h2>
        <form onSubmit={handleAddFormSubmit}>
            <input
                type="text"
                name='name'
                required='required'
                onChange={handleAddFormChange}
                placeholder="Introduce nombre"
            />

            <input
                type="text"
                name='surname'
                required='required'
                onChange={handleAddFormChange}
                placeholder="Introduce Apellidos"

            />

            <input
                type="text"
                name='address'
                required="required"
                onChange={handleAddFormChange}
                placeholder="Introduce Direccion"

            />
              <input
                type="text"
                name='phone'
                required="required"
                onChange={handleAddFormChange}
                placeholder="Introduce teléfono"

            />
              <input
                type="mail"
                name='mail'
                required="required"
                onChange={handleAddFormChange}
                placeholder="Mail"

            />
            <input
                type="text"
                name='date'
                required='required'
                onChange={handleAddFormChange}
                placeholder="Introduce F.Nacimiento"
            />
        </form>

        <button type='submit'>Enviar</button>
    </div>
}




export default Users;