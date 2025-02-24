import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Plus, MapPin, Phone } from 'lucide-react';
import api from '../lib/api';
import type { Person } from '../types';

export default function People() {
  const { data: people, isLoading } = useQuery({
    queryKey: ['people'],
    queryFn: async () => {
      const { data } = await api.get<Person[]>('/personnes');
      return data;
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">People</h1>
        <Link
          to="/people/new"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Person
        </Link>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="text-gray-500">Loading...</div>
          </div>
        ) : !people?.length ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">No people found</h3>
            <p className="mt-2 text-sm text-gray-500">
              Get started by adding a new person to the system.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {people.map((person) => (
              <li key={person.id}>
                <div className="px-4 py-4 flex items-center justify-between sm:px-6">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      {person.name}
                    </h3>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4" />
                      {person.city}
                    </div>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <Phone className="flex-shrink-0 mr-1.5 h-4 w-4" />
                      {person.phone}
                    </div>
                  </div>
                  <div>
                    <Link
                      to={`/people/${person.id}`}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}