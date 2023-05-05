import { AxiosError } from "axios";
interface Movie {
  title: string;
  released: string;
}

export interface Person {
  id: string;
  name: string;
  show: string;
  actor: string;
  movies: Movie[];
  dob: string;
  updatedAt: string;
}

export interface PeopleQueryState {
  loading: boolean;
  data?: Person[];
  error?: AxiosError;
  visible?: number;
  page?: number;
  searchValue?: string;
}