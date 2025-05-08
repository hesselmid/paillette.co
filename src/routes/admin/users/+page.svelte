<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>Users - Paillette.co</title>
</svelte:head>

<div>
	<h1>Users</h1>

	{#if data.usersList && data.usersList.length > 0}
		<div>
			<table>
				<thead>
					<tr>
						<th scope="col">Name</th>
						<th scope="col">Email</th>
						<th scope="col">Role</th>
						<th scope="col">Created</th>
						<th scope="col">View</th>
					</tr>
				</thead>
				<tbody>
					{#each data.usersList as user (user.id)}
						<tr>
							<td>
								{user.firstName}
								{user.lastName}
							</td>
							<td>
								{user.email}
							</td>
							<td>
								{user.role}
							</td>
							<td>
								{new Date(user.createdAt).toLocaleDateString('en-GB')}
							</td>
							<td>
								<a href="/admin/users/{user.id}">View/Edit</a>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{:else}
		<p>No users found.</p>
	{/if}
</div>
