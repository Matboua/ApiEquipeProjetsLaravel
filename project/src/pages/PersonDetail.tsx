import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Phone, MapPin, FolderKanban } from 'lucide-react';
import api from '../lib/api';
import type { Person, Project } from '../types';

export default function PersonDetail() {
  const { id } = useParams<{ id: string }>();

  const { data: person, isLoading: isLoadingPerson } = useQuery({
    queryKey: ['person', id],
    queryFn: async () => {
      const { data } = await api.get<Person>(`/personnes/${id}`);
      return data;
    },
  });

  const { data: projects } = useQuery({
    queryKey: ['person-projects', id],
    queryFn: async () => {
      const { data } = await api.get<Project[]>(`/personne/${id}/projets`);
      return data;
    },
    enabled: !!person,
  });

  if (isLoadingPerson) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!person) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">Person not found</h3>
        <div className="mt-2">
          <Link
            to="/people"
            className="text-indigo-600 hover:text-indigo-500"
          >
            Back to people
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {person.name}
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Personal details and projects.
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                Phone Number
              </dt>
              <dd className="mt-1 text-sm text-gray-900">{person.phone}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                City
              </dt>
              <dd className="mt-1 text-sm text-gray-900">{person.city}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
            <FolderKanban className="h-5 w-5 mr-2" />
            Projects
          </h3>
        </div>
        <div className="border-t border-gray-200">
          {!projects?.length ? (
            <div className="text-center py-6">
              <p className="text-sm text-gray-500">
                Not assigned to any projects yet
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {projects.map((project) => (
                <li key={project.id} className="px-4 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {project.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        Status: {project.status}
                      </p>
                    </div>
                    <Link
                      to={`/projects/${project.id}`}
                      className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                    >
                      View Project
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}