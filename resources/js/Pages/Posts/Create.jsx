import { useForm } from '@inertiajs/react';
import { useState, useRef } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Description, Transition } from '@headlessui/react';

export default function Create() {

    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        title: '',
        description: '',
    });
    

    const handleInputChange = (field, value) => {
        setData((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('posts.store'), {
            preserveScroll: true, // Optional: keeps scroll position
            onSuccess: () => {
                // Optional: reset form fields after successful submission
          
            },
        });
    };


    return (
        <AuthenticatedLayout>
       <div className="container mx-auto max-w-md p-6 bg-white shadow-md rounded-lg mt-10">
       <form onSubmit={handleSubmit} className="space-y-6">
                

                <InputLabel
                        htmlFor="title"
                        value="Title"
                    />
                  <TextInput
                        id="title"
                        value={data.title}
                        onChange={(e) =>
                            handleInputChange('title', e.target.value)
                        }
                        type="text"
                        className="mt-1 block w-full"
                        autoComplete="title"
                    />
              <InputError message={errors.title} className="mt-2" />

                
                <InputLabel
                        htmlFor="description"
                        value="description"
                    />
                  <TextInput
                        id="description"
                        value={data.description}
                        onChange={(e) =>
                            handleInputChange('description', e.target.value)
                        }
                        type="text"
                        className="mt-1 block w-full"
                        autoComplete="description"
                    />
                 <InputError message={errors.description} className="mt-2" />

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>
                        {processing ? 'Saving...' : 'Save'}
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>

            </form>
            </div>
             
        </AuthenticatedLayout>
        
    );
}
