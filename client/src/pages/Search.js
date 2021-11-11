import { useQuery } from '@apollo/client';
import React, { useState, useEffect } from 'react';

import Auth from '../utils/auth';

import SaveDog from '../components/saveDog/saveDog'

import { QUERY_DOGS } from '../utils/queries'

const Search = () => {
    const { loading, data } = useQuery(QUERY_DOGS);
    const dogs = data?.dogs || [];

    return (
        <div className="top-level">
            <div className="post-list">
                {loading ? (
                    <div>LOADING...</div>
                ) : (
                    <SaveDog
                    dogs={dogs}
                    />
                )}
            </div>
        </div>
    )
}

export default Search;