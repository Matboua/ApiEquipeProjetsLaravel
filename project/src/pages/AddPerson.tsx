import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import api from '../lib/api';
import type { Person } from '../types';

type PersonInput = Omit<Person, 'id' | 'created_at' | 'updated_at'>;

export default function AddPerson() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<PersonInput>();

  const createPerson = useMutation({
    mutationFn: async (data: PersonInput) => {
      const response = await api.post('/personnes', data);
      return response.data;
    },
    onSuccess: () => {
      toast.success('Person added successfully');
      navigate('/people');
    },
    onError: () => {
      toast.error('Failed to add person');
    },
  });

  const onSubmit = (data: PersonInput) => {
    createPerson.mutate(data);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Person</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white shadow sm:rounded-lg p-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            {...register('name', { required: 'Name is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            {...register('phone', {
              required: 'Phone number is required',
              pattern: {
                value: /^[0-9+\-\s()]*$/,
                message: 'Invalid phone number format',
              },
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            City
          </label>
          <input
            type="text"
            id="city"
            {...register('city', { required: 'City is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.city && (
            <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
          )}
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/people')}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Add Person
          </button>
        </div>
      </form>
    </div>
  );
}