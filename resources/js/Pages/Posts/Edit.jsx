import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Transition } from '@headlessui/react';

export default function Edit({ post }) {
    // Initialize form with existing post data
    const { data, setData, put, processing, errors, recentlySuccessful } = useForm({
        title: post.title, // Set initial values from the post data
        description: post.description,
    });

    const handleInputChange = (field, value) => {
        setData((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('posts.update', post.id), {
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
            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
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
                    value="Description"
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
                        {processing ? 'Saving...' : 'Save Changes'}
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
        </AuthenticatedLayout>
    );
}
