import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { FolderKanban, Users, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import api from '../lib/api';
import type { Project, Person } from '../types';

export default function Dashboard() {
  const { data: projects } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data } = await api.get<Project[]>('/projets');
      return data;
    },
  });

  const { data: people } = useQuery({
    queryKey: ['people'],
    queryFn: async () => {
      const { data } = await api.get<Person[]>('/personnes');
      return data;
    },
  });

  const getStatusIcon = (status: Project['status']) => {
    switch (status) {
      case 'Terminé':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'En Retard':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'En Cours':
        return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FolderKanban className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Projects
                  </dt>
                  <dd className="text-3xl font-semibold text-gray-900">
                    {projects?.length ?? 0}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total People
                  </dt>
                  <dd className="text-3xl font-semibold text-gray-900">
                    {people?.length ?? 0}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Recent Projects
          </h3>
          <div className="mt-5">
            <div className="flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {projects?.slice(0, 5).map((project) => (
                  <li key={project.id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        {getStatusIcon(project.status)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {project.title}
                        </p>
                        <p className="text-sm text-gray-500">
                          Status: {project.status}
                        </p>
                      </div>
                      <div>
                        <Link
                          to={`/projects/${project.id}`}
                          className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6">
              <Link
                to="/projects"
                className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                View all projects
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}