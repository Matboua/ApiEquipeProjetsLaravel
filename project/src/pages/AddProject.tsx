import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import api from '../lib/api';
import type { Project } from '../types';

type ProjectInput = Omit<Project, 'id' | 'created_at' | 'updated_at'>;

export default function AddProject() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<ProjectInput>();

  const createProject = useMutation({
    mutationFn: async (data: ProjectInput) => {
      const response = await api.post('/projets', data);
      return response.data;
    },
    onSuccess: () => {
      toast.success('Project created successfully');
      navigate('/projects');
    },
    onError: () => {
      toast.error('Failed to create project');
    },
  });

  const onSubmit = (data: ProjectInput) => {
    createProject.mutate(data);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Project</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white shadow sm:rounded-lg p-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Project Title
          </label>
          <input
            type="text"
            id="title"
            {...register('title', { required: 'Title is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            id="status"
            {...register('status', { required: 'Status is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="En Cours">En Cours</option>
            <option value="Terminé">Terminé</option>
            <option value="En Retard">En Retard</option>
          </select>
          {errors.status && (
            <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">
            Start Date
          </label>
          <input
            type="date"
            id="start_date"
            {...register('start_date', { required: 'Start date is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.start_date && (
            <p className="mt-1 text-sm text-red-600">{errors.start_date.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
            Duration (days)
          </label>
          <input
            type="number"
            id="duration"
            min="1"
            {...register('duration', {
              required: 'Duration is required',
              min: { value: 1, message: 'Duration must be at least 1 day' },
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.duration && (
            <p className="mt-1 text-sm text-red-600">{errors.duration.message}</p>
          )}
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/projects')}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Create Project
          </button>
        </div>
      </form>
    </div>
  );
}