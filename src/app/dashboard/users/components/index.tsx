"use client"
import { use, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import Image from 'next/image'; // Para otimização de imagens
import { Edit, Settings } from 'lucide-react'; // Ícones modernos
import { api } from '@/services/api';
import { headers } from 'next/headers';
import { getCookieClient } from '@/lib/cookieClient';
import { toast } from 'sonner'

<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />

interface UserProps {
    id: string;
    name: string;
    email: string;
    isApproved: boolean;
    role: string;
    created_at: string;
    updated_at: string;
}

interface Props {
    users: UserProps[]
}


export function ShowUser({ users: initialUsers }: Props) {

    const [users, setUsers] = useState<UserProps[]>(initialUsers); //ESTOU FALANDO PARA O TYPE QUE ELE VAI SER DO TIPO DA INTERFACE USER COM ARRAY

    async function handleApprove(userId: string, approve: boolean) {

        const token = await getCookieClient();

        try {

            const response = await api.put(`/users/id/approve`, {}, {
                params: {
                    user_id: userId
                },

                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const updateUser = response.data;

            //AQUI VOU ATUALIZAR OS DADOS DO USUARIO PARA O FRONT
            setUsers(preventUsers =>
                preventUsers.map(user =>
                    user.id === userId ? {
                        ...user, isApproved: updateUser.isApproved
                    } : user
                )
            );

            toast.success("Usuário aprovado com sucesso!")

        } catch (error) {
            console.error("Erro ao aprovar:", error);
            toast.error("Não foi possível aprovar o usuário")

        }

    }


    return (
        <>
            <div className="container py-3 ">
                <input type='text' placeholder='pesquise' className="form-control mb-3 " style={{ maxWidth: "300px" }} />

                <div className="row g-4 justify-content-end">
                    {users.map(user => (
                        <div key={user.id} className="col-12 col-sm-10 col-md-6 col-lg-5">
                            <div className="card" style={{ borderRadius: '15px', backgroundColor: "#dbeeffff" }}>
                                <div className="card-body p-4">
                                    <div className="d-flex">
                                        <div className="flex-shrink-0">
                                            <img
                                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                                                alt="avatar"
                                                width={150}
                                                height={150}
                                                className="img-fluid"
                                                style={{ borderRadius: '10px', objectFit: 'cover' }}
                                            />
                                        </div>
                                        <div className="flex-grow-1 ms-3">
                                            <h5 className="mb-1">{user.name}</h5>
                                            <div className="mb-2 p-2 rounded bg-body-tertiary">
                                                <div className='d-flex justify-content-between'>
                                                    <small className="text-muted">Email:</small>
                                                    <small>{user.email}</small>
                                                </div>
                                                <div className='d-flex justify-content-between'>
                                                    <small className="text-muted">Status:</small>
                                                    <small className={user.isApproved ? 'text-success' : 'text-warning'}>{user.isApproved ? 'Aprovado' : 'Pendente'}</small>
                                                </div>
                                                <div className='d-flex justify-content-between'>
                                                    <small className="text-muted">Acesso:</small>
                                                    <small>{user.role}</small>
                                                </div>
                                            </div>
                                            <div className="d-flex pt-1">
                                                {user.isApproved == false ? (
                                                    <button type="button" className="btn btn-warning me-1 flex-grow-1" onClick={() => handleApprove(user.id)}>
                                                        <Edit size={16} className="me-1" /> Aprovar
                                                    </button>
                                                ) : (
                                                    <button type="button" className="btn btn-warning me-1 flex-grow-1" onClick={() => handleApprove(user.id)}>
                                                        <Edit size={16} className="me-1" /> Suspender
                                                    </button>
                                                )
                                                }

                                                {user.role === "admin" ? (
                                                    <button type="button" className="btn btn-danger flex-grow-1">
                                                        <Settings size={16} className="me-1" /> Deletar
                                                    </button>) : (
                                                    <button type="button" className="btn btn-danger flex-grow-1" disabled>
                                                        <Settings size={16} className="me-1" /> Somente Admin
                                                    </button>
                                                )

                                                }

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
