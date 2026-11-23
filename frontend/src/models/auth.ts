export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
}

//retorno da API quando o admin faz login com sucesso
export interface AuthSession {
  token: string; // enviado em cada req do admin: "Authorization: Bearer <token>"
  user: AdminUser;
}
