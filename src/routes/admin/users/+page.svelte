<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Admin - Manage Users</title>
</svelte:head>

<div class="container mx-auto p-4">
	<h1 class="text-2xl font-bold mb-4">Manage Users</h1>

	{#if data.usersList && data.usersList.length > 0}
		<div class="overflow-x-auto shadow rounded-lg">
			<table class="min-w-full divide-y divide-gray-200">
				<thead class="bg-gray-50">
					<tr>
						<th
							scope="col"
							class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>Name</th
						>
						<th
							scope="col"
							class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>Email</th
						>
						<th
							scope="col"
							class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>Role</th
						>
						<th
							scope="col"
							class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>Created</th
						>
						<th scope="col" class="relative px-6 py-3">
							<span class="sr-only">View</span>
						</th>
					</tr>
				</thead>
				<tbody class="bg-white divide-y divide-gray-200">
					{#each data.usersList as user (user.id)}
						<tr>
							<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
								{user.firstName}
								{user.lastName}
							</td>
							<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
								{user.email}
							</td>
							<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
								{user.role}
							</td>
							<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
								{new Date(user.createdAt).toLocaleDateString()}
							</td>
							<td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
								<a href="/admin/users/{user.id}" class="text-indigo-600 hover:text-indigo-900"
									>View/Edit</a
								>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{:else}
		<p class="text-gray-500">No users found.</p>
	{/if}
</div>
