<template>
  <div class="container">
    <guac-client :query="query" :force-http="forceHttp" />
  </div>
</template>

<script>
  import GuacClient from '@/components/GuacClient'

  export default {
    name: 'app',
    components: {
      GuacClient
    },

    // http://localhost:8081/?scheme=rdp&hostname=10.13.37.42&port=3390&ignore-cert=true'
    data() {
      return {
        connect: false,
        scheme: 'rdp',
        hostname: '10.13.37.42',
        port: '3390',
        user: '',
        pass: '',
        ignoreCert: true,
        security: '',
        forceHttp: false,
      }
    },
    computed: {
      queryObj() {
        return {
          scheme: this.scheme,
          hostname: this.hostname,
          port: this.port,
          'ignore-cert': this.ignoreCert,
          security: this.security,
          username: this.user,
          password: this.pass
        }
      },
      query() {
        const queryString = []
        for (const [k, v] of Object.entries(this.queryObj)) {
          if (v) {
            queryString.push(`${k}=${encodeURIComponent(v)}`)
          }
        }
        return queryString.join("&")
      },
      scrubbedQuery() {
        return this.query.replace(/password=[^& ]+/, 'password=****')
      }
    },
    methods: {
      doConnect() {
        if (window.localStorage) {
          window.localStorage.setItem('query', JSON.stringify(this.queryObj))
        }
        this.connect = true
      }
    },
    mounted() {
      if (window.localStorage && window.localStorage.getItem('query')) {
        let query
        try {
          query = JSON.parse(window.localStorage.getItem('query'))
        } catch (e) {
          window.localStorage.setItem('query', '{}')
          return
        }
        this.scheme = query.scheme
        this.hostname = query.hostname
        this.port = query.port
        this.ignoreCert = query['ignore-cert']
        this.nla = query.nla
        this.user = query.username
        this.pass = query.password
      }
    }
  }
</script>

<style>
    html, body {
        margin: 0;
        height: 100%;
        width: 100%;
    }

    .container {
        width: 100%;
        height: 100%;
    }

    #app {
        height: 100%;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        font-size: 16pt;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        padding: 1rem;
    }

    h1 {
        text-align: center;
    }

    .field {
        display: grid;
        grid-template-columns: 300px 1fr;
        margin-bottom: 1rem;
    }

    label {
        text-align: right;
    }

    label::after {
        content: ': '
    }

    input {
        margin-left: 1rem;
        margin-right: 1rem;
        font-size: 16pt;
        border: 1px solid black;
        border-radius: 2px;
        padding-left: 0.5rem;
    }

    .center {
        text-align: center;
    }

    .connect {
        font-size: 16pt;
        background: none;
        border: 1px solid black;
        border-radius: 5px;
        padding: .5rem 1rem;
    }

    .pl-1 {
        padding-left: 1rem;
    }
</style>
