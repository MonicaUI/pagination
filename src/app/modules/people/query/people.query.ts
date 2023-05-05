import { useEffect, useMemo, useState } from "react";
import { AxiosError } from "axios";
import { API_RESOURCE } from "../../../shared/constant";
import { useAxios } from "../../../shared/context";
import { Person, PeopleQueryState } from "../model";

export const usePeopleQuery = (page: number, searchValue: string, recordCount: number, sortedAsc: string): PeopleQueryState => {
  const axios = useAxios();
  const [state, setState] = useState<PeopleQueryState>({ loading: false, searchValue: "", data: [] });


  const fetchPeoples = async () => {
    try {
      const { data } = await axios.get<Person[]>(`/${API_RESOURCE.PEOPLE}/pagination?page=${page}&limit=100&sort=${sortedAsc}&search=`);
      setState({ data, loading: false, error: undefined, page });

    } catch (error) {
      setState({ data: undefined, error: error as AxiosError, loading: false });
    }
  };

  useEffect(() => {
    setState({ loading: true, page });
    fetchPeoples();
  }, []);

  const value = useMemo(() => state, [state]);

  return value;
};
