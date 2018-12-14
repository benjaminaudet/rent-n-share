<template>
  <div id="onboarding">
    <div>
      <h1 id="title"><span class="small">{{steps[currentStep].smallTitle}}</span><br>{{steps[currentStep].title}}</h1>
      <p>{{steps[currentStep].paragraph}}</p>
      <h1>{{steps[currentStep].paragraphTitle}}</h1>
      <div 
        id="swipe"
        v-on:click="incrementCurrentStep"
        v-show="currentStep < 2"
      >
      </div>
      <div class="button">
        <router-link 
          :to="'/signup'"
          class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
          v-show="currentStep == 2"
        >
          Sign Up
        </router-link>
      </div>
      <br>
      <div id="already-signed-up">
        <router-link 
          :to="'/signin'"
          v-show="currentStep == 2"
        >
          Already signed up?
        </router-link>
      </div>
    </div>
    <div id="state">
        <div class="ball" v-bind:class="{ current: currentStep == 0 }"></div>
        <div class="ball" v-bind:class="{ current: currentStep == 1 }"></div>
        <div class="ball" v-bind:class="{ current: currentStep == 2 }"></div>
    </div>
  </div>
</template>

<script>
  import _ from 'underscore';
  export default {
      created: function() {
        document.body.style.backgroundColor = '#FF9800';
      },
      mounted: function() {
        var hammertime = new Hammer(document.body);
        hammertime.on('swipeleft', _.bind(function(ev) {
          if (this.currentStep < 2) {
            this.currentStep++;
          }
        }, this));
        hammertime.on('swiperight', _.bind(function(ev) {
          if (this.currentStep > 0) {
            this.currentStep--;
          }
        }, this));
      },
      destroyed: function() {
        document.body.style.backgroundColor = '#fff';
        localStorage.setItem('onboardingDone', true);

      },
      methods: {
        incrementCurrentStep: function() {
          this.currentStep++;
        }
      },
      data: function() {
        return {
            currentStep: 0,
            steps: [
                {
                    'smallTitle': 'Welcome\n on',
                    'title': `Rent'n'Share`,
                    'paragraph': 'The marketplace where you make profitable your belongings without selling it !',
                    'paragraphTitle': ``
                },
                {
                    'smallTitle': '',
                    'title': 'Rent',
                    'paragraph': `  You are doing a travel in a foreign country ?
                                    You need something only for your trip but you don't want to buy it ?

                                    You will find your happiness on `,
                    'paragraphTitle': `Rent'n'Share`
                },
                {
                    'smallTitle': '',
                    'title': 'Lease',
                    'paragraph': `  You have stuff that you don't use anymore ?
                                    You fill like you don't make profit on your invests ?
                                    You want to serve people ?
                                    Lease your stuff on`,
                    'paragraphTitle': `Rent'n'Share`
                }
            ]
        }
    }
  }
</script>
