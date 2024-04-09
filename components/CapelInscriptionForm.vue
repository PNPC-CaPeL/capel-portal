<template>
  <div>
    <form
      v-if="!error && !submitted"
      noValidate
      @submit.prevent="postForm"
    >
      <div>
        <label
          for="identite"
          :class="{ error: identite.error }"
        >
          {{ $t('signUp.identity') }}
          <span aria-hidden>*</span>
          <span class="sr-only"> ({{ $t('signUp.mandatory') }}) </span>
        </label>
        <input
          id="identite"
          v-model="identite.value"
          :class="{ error: identite.error }"
          type="text"
          required
        />
        <p
          v-if="identite.error"
          class="error-message"
        >
          {{ identite.error }}
        </p>
      </div>
      <div>
        <label
          for="email"
          :class="{ error: email.error }"
        >
          {{ $t('signUp.email') }}
          <span aria-hidden>*</span>
          <span class="sr-only"> ({{ $t('signUp.mandatory') }}) </span>
        </label>
        <input
          id="email"
          v-model="email.value"
          :class="{ error: email.error }"
          type="email"
          required
        />
        <p
          v-if="email.error"
          class="error-message"
        >
          {{ email.error }}
        </p>
      </div>
      <div>
        <legend :class="{ error: typeCompte.error }">
          {{ $t('signUp.accountType') }}
          <span aria-hidden>*</span>
          <span class="sr-only"> ({{ $t('signUp.mandatory') }}) </span>
        </legend>
        <div>
          <input
            id="type_individuel"
            v-model="typeCompte.value"
            :class="{ error: typeCompte.error }"
            type="radio"
            value="PI"
            name="typeCompte"
            required
          />
          <label
            for="type_individuel"
            :class="{ error: typeCompte.error }"
          >
            {{ $t('signUp.individualDive') }}
          </label>
        </div>
        <div>
          <input
            id="type_structure"
            v-model="typeCompte.value"
            :class="{ error: typeCompte.error }"
            type="radio"
            value="SP"
            name="typeCompte"
            required
          />
          <label
            for="type_structure"
            :class="{ error: typeCompte.error }"
          >
            {{ $t('signUp.diveStructure') }}
          </label>
        </div>
        <p
          v-if="typeCompte.error"
          class="error-message"
        >
          {{ typeCompte.error }}
        </p>
      </div>
      <div v-if="typeCompte.value == 'SP'">
        <label
          for="structureName"
          :class="{ error: structureName.error }"
        >
          {{ $t('signUp.nomStructure') }}
          <span aria-hidden>*</span>
          <span class="sr-only"> ({{ $t('signUp.mandatory') }}) </span>
        </label>
        <input
          id="structureName"
          v-model="structureName.value"
          :class="{ error: structureName.error }"
          type="text"
          :required="typeCompte.value == 'SP'"
        />
        <p
          v-if="structureName.error"
          class="error-message"
        >
          {{ structureName.error }}
        </p>
      </div>
      <div>
        <button>
          {{ $t('signUp.createAccount') }}
        </button>
      </div>
      <div
        class="italic text-sm text-gray-500"
        aria-hidden
      >
        * {{ $t('signUp.mandatory') }}
      </div>
    </form>
    <div
      v-else-if="submitted"
      class="content p-6 rounded bg-capel-blue-200 text-capel-blue-800"
    >
      <h3>{{ $t('signUp.post.success.title') }}</h3>
      <p>{{ $t('signUp.post.success.thanks') }}</p>
      <p>{{ $t('signUp.post.success.email') }}</p>
      <p class="italic">
        {{ $t('signUp.post.success.spamWarning') }}
      </p>
    </div>
    <div
      v-else-if="error"
      class="content p-6 rounded bg-red-200 text-red-800"
    >
      <h3>{{ $t('signUp.post.error.title') }}</h3>
      <p>{{ $t('signUp.post.error.failed') }}</p>
      <p>{{ $t('signUp.post.error.sorry') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<script lang="ts">
export default {
  async setup() {
    const { t } = useI18n()
    const switchLocalePath = useSwitchLocalePath()

    return { t, switchLocalePath }
  },
  data() {
    return {
      identite: {
        value: null as string | null,
        error: null as string | null,
      },
      email: {
        value: null as string | null,
        error: null as string | null,
      },
      typeCompte: {
        value: 'PI',
        error: null as string | null,
      },
      structureName: {
        value: null as string | null,
        error: null as string | null,
      },
      error: false,
      submitted: false,
    }
  },
  watch: {
    'identite.value'() {
      if (this.identite.error) {
        this.validateIdentite()
      }
    },
    'email.value'() {
      if (this.email.error) {
        this.validateEmail()
      }
    },
    'typeCompte.value'() {
      if (this.typeCompte.error) {
        this.validateTypeCompte()
      }
    },
    'structureName.value'() {
      if (this.structureName.error) {
        this.validateStructure()
      }
    },
  },
  methods: {
    validateIdentite(): boolean {
      if (!this.identite.value) {
        this.identite.error = this.t('signUp.error.mandatory')

        return false
      }

      this.identite.error = null

      return true
    },
    validateEmail(): boolean {
      if (!this.email.value) {
        this.email.error = this.t('signUp.error.mandatory')
        return false
      } else if (!this.isEmail(this.email.value)) {
        this.email.error = this.t('signUp.error.email')
        return false
      }

      this.email.error = null
      return true
    },
    validateTypeCompte(): boolean {
      if (!this.typeCompte.value) {
        this.typeCompte.error = this.t('signUp.error.mandatory')
        return false
      }

      this.typeCompte.error = null
      return true
    },
    validateStructure(): boolean {
      if (this.typeCompte.value == 'structure' && !this.structureName.value) {
        this.structureName.error = this.t('signUp.error.mandatory')
        return false
      }

      this.structureName.error = null
      return true
    },
    validate(): boolean {
      this.validateIdentite()
      this.validateEmail()
      this.validateTypeCompte()
      this.validateStructure()

      return (
        !this.identite.error &&
        !this.email.error &&
        !this.typeCompte.error &&
        !this.structureName.error
      )
    },
    async postForm() {
      if (!this.validate()) {
        return
      }

      const response = await fetch(
        useRuntimeConfig().public.N8N_WEBHOOK_HUB_URL,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            formId: 'capel-form-signup',
            name: this.identite.value,
            email: this.email.value,
            type: this.typeCompte.value,
            structureName: this.structureName.value,
          }),
        },
      )

      const { success: responseSuccess = false } = (await response.json()) || {}

      if (responseSuccess) {
        this.submitted = true
      } else {
        this.error = true
      }
    },
    isEmail(email: string): boolean {
      return !!email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        )
    },
  },
}
</script>
