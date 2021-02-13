
import React, { useState, FormEvent } from "react";
import {Container,Content,Error,Form} from './styles'
/* import { getResults } from "../../services/client"; */

/* import { Section } from "../../styles/shared"; */
/* import { Container, Content, Form, Error } from "./styles"; */

import Header from "../../components/Header";
/* import MediaCarousel from "../../components/Moviecarousel"; */

import Button from "../../components/Button";
import SearchInput from "../../components/SearchInput";
import api from '../../services/api'

export interface IResult {
  full_name: string;
  description: string;
  stargazers_count: number;
  open_issues_count: number;
  length: null;
  owner: {
    login: string;
    avatar_url: string;
  };

}

const Search: React.FC = () => {
    const [query, setQuery] = useState("");
    const [inputError, setInputError] = useState("");
    const [result, setResult] = useState<IResult | null>(null);
    const [lastQuery, setLastQuery] = useState("");

    async function handleSearch(
        event: FormEvent<HTMLFormElement>
    ): Promise<void> {
        event.preventDefault();

        if (!query) {
            setInputError("Para continuar você precisa buscar algo!! :)");
            return;
        }

        try {
            const searchResult = await api.get(`search/issues?q=${query}`);
            setResult(searchResult.data);

            setLastQuery(query);
            setQuery("");
            setInputError("");

            /* if (searchResult.length === 0) {
                setInputError(`No results found for ${query}`);
            } */
        } catch (err) {
            setInputError("Ops, algo não está certo.");
        }
    }

    return (
        <>
            <Container>

                <Content>
                    <Form onSubmit={handleSearch}>
                        <SearchInput
                            name="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Busque"
                        />

                        <Button type="submit">Buscar</Button>


                    </Form>
                </Content>

                {inputError && <Error>{inputError}</Error>}

              {/*   {result > 0 && (

                        <h1>Resultados para: {lastQuery}</h1>


                )} */}
            </Container>
        </>
    );
};

export default Search;