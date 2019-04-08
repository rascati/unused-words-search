import React, { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios'

import Card from './Card'

const Wrapper = styled.div`
  margin-top: 2rem;
`

const Form = styled.form`
  display: flex;
  flex-flow: column nowrap;
  padding: 1rem 0;
  border-bottom: 1px solid lightgray;
  margin-bottom: 3rem;

  label {
    font-size: 1.75rem;
    margin-bottom: 20px;
    font-weight: 800;
  }
`

const InputRow = styled.div`
  display: flex;

  input {
    width: 50%;
    font-size: 1.5rem;
    padding: 0.6rem 0.75rem 0.75rem;
  }

  button {
    margin-left: 15px;
    font-size: 1.5rem;
    padding: 0.5rem 1rem;
    color: inherit;
    background-color: white;
    border: 1px solid lightgray;

    &:hover {
      background-color: whitesmoke;
    }
  }
`

const Instructions = styled.div`
  text-align: center;
`

const ResultsCounter = styled.div`
  font-style: italic;
`

const Link = styled.a`
  font-weight: 700;
  color: inherit;
  transition: 0.2s all cubic-bezier(0.25, 0.46, 0.45, 0.94);

  &:hover {
    color: #6ad6a8;
  }
`

class CardList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searched: false,
      searchParam: '',
      searchResult: [],
      searchObject: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      searchParam: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    axios
      .get(
        `https://api.github.com/search/repositories?q=${
          this.state.searchParam
        }+in:name&per_page=30`
      )
      .then(response => {
        const result = response.data
        this.setState({
          searchResult: [...result.items],
          searchObject: result,
          searched: true
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    return (
      <Wrapper>
        <Form onSubmit={this.handleSubmit}>
          <label>
            <span role="img" aria-label="open book">
              📖
            </span>
            &nbsp;&nbsp; Search for a repository
          </label>
          <p>
            Find what small set of English words are left to be used for GitHub
            and NPM project names
          </p>
          <InputRow>
            <input
              type="text"
              name="name"
              placeholder="repo or package name"
              value={this.state.searchParam}
              onChange={this.handleChange}
            />
            <button type="submit">Search</button>
          </InputRow>
        </Form>

        {!this.state.searched ? (
          <Instructions>Search for a repository above</Instructions>
        ) : (
          <div>
            {this.state.searchObject.total_count ? (
              // results exist
              <ResultsCounter>
                {this.state.searchObject.total_count} results found
              </ResultsCounter>
            ) : (
              // no results found
              <Instructions>
                No results found
                <br />
                <br />
                Be the first to get there and&nbsp;
                <Link
                  href="https://github.com/new/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  create it on GitHub now
                </Link>
              </Instructions>
            )}

            {this.state.searchResult.map(result => (
              <Card key={result.id} repo={result} />
            ))}
          </div>
        )}
      </Wrapper>
    )
  }
}

export default CardList
