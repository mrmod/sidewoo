<template>
  <div id="public" >
    <header class="md-layout md-gutter border-solid-black-1">
      <div class="md-layout-item md-size-55 md-alignment-bottom-left">
        <span class="md-display-3">{{companyName}}</span>
      </div>
      <div class="md-layout-item md-alignment-bottom-right text-align-bottom text-align-end margin-r10">
        <router-link to="/login" tag="span">
          <span class="md-display-1">Login</span>
        </router-link>
        
        <span class="md-display-1">|</span>

        <router-link to="/register" tag="span">
          <span class="md-display-1">SignUp</span>
        </router-link>
      </div>
    </header>

    <section>
      All this public content

      <p>A picture of buildings with a can and string between them, green hills in the near background,
         and blue sky in the far background.
      </p>
      <div id="sky">
        <div id="left-hill" class="fg-hill"></div>
        <div id="right-hill" class="bg-hill"></div>
        <div id="hill-3" class="hill bg-hill"></div>
        <div id="building-1" class="building fg-building"></div>
        <div id="building-2" class="building bg-building"></div>

        <div id="building-3" class="building fg-building"></div>
        <div id="building-4" class="building bg-building"></div>

        <div id="ground"></div>
        <div id="whitewash">
          <span class="md-alignment-top-center md-display-3">Small Business Community Engine</span>
          <div class="md-layout md-gutter md-alignment-space-between">
            <md-card class="md-layout-item">
              <md-card-header>Reason 1</md-card-header>
              <md-card-content>
                Sidewoo gives you great community love
              </md-card-content>
            </md-card>
            <md-card class="md-layout-item">
              <md-card-header>Reason 2</md-card-header>
              <md-card-content>
                It also removes unsightly coffee spills
              </md-card-content>
            </md-card>
            <md-card class="md-layout-item">
              <md-card-header>Reason 3</md-card-header>
              <md-card-content>
                You can't say "Business" without "Siness"
              </md-card-content>
            </md-card>
          </div>
        </div>
      </div>
    </section>
    <footer>
      Copyright 2020 - 50/50 Serious
    </footer>
  </div>
</template>
<script>
export default {
    name: 'Public',
    data() {
      return {
        companyName: 'SideWoo',
      }
    }
}
</script>
<style scoped>
.border-solid-black-1 {
  border: 1px solid black;
}
.text-align-end {
  text-align: end;
}
.margin-r10 {
  margin-right: 10px;
}
.text-align-bottom {
  margin-top: auto;
}

.fg-hill {
  background-color: lawngreen;
}
.bg-hill {
  background-color: rgba(0, 255, 0, 0.5);
}
.far-bg-hill {
  background-color: rgba(0, 250, 0, 0.5);
}
.fg-building {
  background-color: rgba(130, 0, 0, 1.0);
}
.bg-building {
    background-color: rgba(170, 0, 0, 0.9);
}
.bg-far-building {
    background-color: rgba(190, 255, 0, 0.8);
}

.building {
  width: 20%;
  height: 40vh;
  position: absolute;
  z-index: 110;
}

.hill {
  width: 50%;
  height: 60vh;
  transform: rotate(45deg);
  position: absolute;
  z-index: 50;
}
#building-1 {
  top: 55vh;
  left: -1vw;
}
#building-2 {
  left: -15vw;
  top: 55vh;
}

#building-3 {
  left: 71vw;
  top: 55vh;
}
#building-4 {
  left: 86vw;
  top: 55vh;
}
#hill-3 {
  top: 50vh;
  left: 5%;
}
#ground {
  background-color: gray;
  width: 100%;
  height: 20vh;
  position: absolute;
  z-index: 100;
}
#whitewash {
  text-align: center;
  background-color: white;
  width: 100%;
  height: 40vh;
  top: 20vh;
  position: relative;
  z-index: 100;
}
#sky {
  width: 100%;
  height: 80vh;
  background-color: skyblue;
}

#left-hill {
  width: 50%;
  height: 60vh;
  transform: rotate(45deg);
  position: relative;
  top: 30vh;
  left: -25%;
  z-index: 50;
}
#right-hill {
  width: 60%;
  height: 10vh;
  left: 10vw;
  transform: rotate(45deg);
  position: absolute;
}
</style>