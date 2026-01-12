declare namespace google {
  namespace accounts {
    namespace oauth2 {
      interface TokenClient {
        requestAccessToken: () => void
      }

      interface TokenClientConfig {
        client_id: string
        scope: string
        callback: (response: { access_token?: string; error?: string }) => void
      }

      function initTokenClient(config: TokenClientConfig): TokenClient
    }
  }
}
