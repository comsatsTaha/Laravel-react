import React from 'react';
import { Link, useForm } from '@inertiajs/react';

export default function Index({ posts }) {
    const { delete: destroy, processing } = useForm();

    const handleDelete = (id) => {
        if (!confirm('Are you sure you want to delete this post?')) return;

        destroy(route('posts.destroy', id), {
            onSuccess: () => {
                console.log(`Post ${id} deleted successfully`);
            },
            onError: (error) => {
                console.error('Error deleting post:', error);
            },
        });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Posts</h1>
                <Link
                    href={route('posts.create')}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    New Post
                </Link>
            </div>

            <table className="w-full table-auto border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">Title</th>
                        <th className="border border-gray-300 px-4 py-2">Description</th>
                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <tr key={post.id}>
                                <td className="border border-gray-300 px-4 py-2">{post.title}</td>
                                <td className="border border-gray-300 px-4 py-2">{post.description}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <Link
                                        href={route('posts.edit', post.id)}
                                        className="text-blue-500 hover:underline mr-4"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(post.id)}
                                        className={`text-red-500 hover:underline ${
                                            processing ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                        disabled={processing}
                                    >
                                        {processing ? 'Deleting...' : 'Delete'}
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan="3"
                                className="text-center border border-gray-300 px-4 py-2"
                            >
                                No posts available.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
