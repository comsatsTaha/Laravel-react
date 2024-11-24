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
                setData({
                    title: '',
                    description: '',
                });
            },
        });
    };


    return (
        <AuthenticatedLayout>
             
        </AuthenticatedLayout>
        
    );
}
