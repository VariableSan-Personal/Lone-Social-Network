<script setup lang="ts">
	import { collection, doc, getDoc, getDocs, getFirestore, setDoc } from 'firebase/firestore'

	const { $api } = useNuxtApp()
	const db = getFirestore()

	const { data: projects } = await useAsyncData('projects', async () => {
		const projectsCollection = collection(db, 'projects')
		const projectsSnapshot = await getDocs(projectsCollection)

		const projectsList: Record<string, string>[] = []

		projectsSnapshot.forEach((doc) => {
			projectsList.push({
				id: doc.id,
				...doc.data(),
			})
		})

		return projectsList
	})

	const createProject = async () => {
		await setDoc(doc(db, 'projects', 'project1'), {
			title: 'Мой проект',
			description: 'Описание проекта',
			createdAt: new Date().toISOString(),
			tags: ['nuxt', 'firebase'],
			author: {
				name: 'Нурсултан',
				email: 'user@example.com',
			},
		})
	}

	const fetchProjectById = async () => {
		const docRef = doc(db, 'projects', 'project1')
		const docSnap = await getDoc(docRef)

		if (docSnap.exists()) {
			console.log(docSnap.data())
		}
	}

	const fetchAllProjects = async () => {
		const projectsCollection = collection(db, 'projects')
		const projectsSnapshot = await getDocs(projectsCollection)

		const projects: Record<string, string>[] = []
		projectsSnapshot.forEach((doc) => {
			projects.push({
				id: doc.id,
				...doc.data(),
			})
		})

		console.log(projects)
	}

	const testMsw = async () => {
		const data = await $api('/api/user')
		console.info(data)
	}
</script>

<template>
	<div>
		<div>Projects: {{ projects }}</div>

		<div class="flex gap-4">
			<UButton @click="testMsw">Test MSW</UButton>
			<UButton @click="createProject">Create project</UButton>
			<UButton @click="fetchProjectById">Fetch project by id</UButton>
			<UButton @click="fetchAllProjects">Fetch all projects</UButton>
		</div>

		<!-- <HomeHero /> -->

		<!-- <section class="pb-12">
			<div class="container">
				<div class="flex flex-wrap items-start">
					<ProfileAside class="mx-auto w-full sm:w-9/12 lg:w-1/4" />

					<div class="mt-12 w-full lg:w-3/4 lg:pl-8">
						<h2 class="mb-12 text-3xl font-bold lg:text-4xl">{{ t('portfolio.projects') }}:</h2>

						<ul>
							<li v-for="portfolio in works" :key="portfolio.id" class="not-last:mb-12">
								<PortfolioWork :portfolio="portfolio" />
							</li>
						</ul>
					</div>
				</div>
			</div>
		</section> -->
	</div>
</template>
