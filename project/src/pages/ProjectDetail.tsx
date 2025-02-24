import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { UserPlus, Users, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../lib/api';
import type { Project, Person } from '../types';

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  const { data: project, isLoading: isLoadingProject } = useQuery({
    queryKey: ['project', id],
    queryFn: async () => {
      const { data } = await api.get<Project>(`/projets/${id}`);
      return data;
    },
  });

  const { data: people } = useQuery({
    queryKey: ['project-people', id],
    queryFn: async () => {
      const { data } = await api.get<Person[]>(`/projet/${id}/personnes`);
      return data;
    },
  });

  const removePerson = useMutation({
    mutationFn: async (personId: number) => {
      await api.delete(`/projet/${id}/personne`, {
        data: { person_id: personId },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project-people', id] });
      toast.success('Person removed from project');
    },
    onError: () => {
      toast.error('Failed to remove person from project');
    },
  });

  if (isLoadingProject) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">Project not found</h3>
        <div className="mt-2">
          <Link
            to="/projects"
            className="text-indigo-600 hover:text-indigo-500"
          >
            Back to projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{project.title}</h1>
          <p className="mt-1 text-sm text-gray-500">
            Started on {new Date(project.start_date).toLocaleDateString()}
          </p>
        </div>
        <Link
          to={`/projects/${id}/add-people`}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <UserPlus className="h-5 w-5 mr-2" />
          Add People
        </Link>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Project Details
          </h3>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Status</dt>
              <dd className="mt-1 text-sm text-gray-900">{project.status}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Duration</dt>
              <dd className="mt-1 text-sm text-gray-900">{project.duration} days</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Team Members
          </h3>
        </div>
        <div className="border-t border-gray-200">
          <ul className="divide-y divide-gray-200">
            {people?.map((person) => (
              <li key={person.id} className="px-4 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{person.name}</p>
                    <p className="text-sm text-gray-500">{person.city}</p>
                  </div>
                  <button
                    onClick={() => removePerson.mutate(person.id)}
                    className="inline-flex items-center p-1 border border-transparent rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </li>
            ))}
            {people?.length === 0 && (
              <li className="px-4 py-4 text-sm text-gray-500 text-center">
                No team members yet
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}