declare namespace NodeJS {
	export interface ProcessEnv {
		API_PORT: string;
		DATABASE_NAME: string;
		DATABASE_URL: string;
		DATABASE_PORT: string;
		DATABASE_USERNAME: string;
		DATABASE_PASSWORD: string;
		SESSION_SECRET: string;
	}
}
