
<template>
  <div class="wrapper relative pt-11 sm:pt-14">
    <Loading></Loading>

    <HeaderComponent></HeaderComponent>

    <DrawerComponent></DrawerComponent>

    <main class="main">
      <router-view />
    </main>

    <FooterComponent></FooterComponent>
  </div>
</template>
