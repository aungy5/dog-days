import React from 'react';
import { useQuery } from '@apollo/client';

import DogList from '../components/dogList/dogList'

import { QUERY_USER } from '../utils/queries'

import Auth from '../utils/auth'

const UserPage = () => {
    const username = Auth.getProfile().data.username
    console.log(username)

    const { loading, data } = useQuery(QUERY_USER, {
        variables: { username }
    });

    const savedDogs = data?.savedDogs || [];

    console.log(savedDogs)

    return (
        <div className="top-level">
            <div className="post-list">
                {loading ? (
                    <div>LOADING...</div>
                ) : (
                    // <DogList 
                    // dogs={savedDogs}
                    // />
                    <h1 className="">{savedDogs}saved should be here.</h1>
                )}
            </div>
        </div>
    )
}

export default UserPage;