import React from 'react';
import { useQuery } from '@apollo/client';

import DogList from '../components/dogList/dogList'

import { QUERY_DOGS } from '../utils/queries'

const Dog = () => {
    const { loading, data } = useQuery(QUERY_DOGS);
    const dogs = data?.dogs || [];

    return (
        <div className="top-level">
            <div className="post-list">
                {loading ? (
                    <div>LOADING...</div>
                ) : (
                    <DogList 
                    dogs={dogs}
                    />
                )}
            </div>
        </div>
    )
}

export default Dog;