import { useEffect, useMemo, useState } from "react";
import { AxiosError } from "axios";
import { API_RESOURCE } from "../../../shared/constant";
import { useAxios } from "../../../shared/context";
import { Person, PeopleQueryState } from "../model";

export const usePeopleQuery = (): PeopleQueryState => {
  const axios = useAxios();
  const [state, setState] = useState<PeopleQueryState>({ loading: false });
  // const [visible, setVisible] = useState(10)

  const fetchPeoples = async () => {
    try {
      const { data } = await axios.get<Person[]>(`/mock-api/${API_RESOURCE.PEOPLE}`);
      data.sort(function (a: any, b: any) {
        if (a.name < b.name) { return -1; }
        if (a.name > b.name) { return 1; }
        return 0;
      })
      setState({ data, loading: false, error: undefined, visible: 10 });
    } catch (error) {
      setState({ data: undefined, error: error as AxiosError, loading: false });
    }
  };

  useEffect(() => {
    setState({ loading: true });

    fetchPeoples();
  }, []);

  const value = useMemo(() => state, [state]);

  return value;
};
