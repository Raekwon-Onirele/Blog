// import css
import styles from "./Search.module.css"

// import hooks
import { useFetchDocument } from "../../hooks/useFetchDocument"
import { useQuery } from "../../hooks/useQuery"

const Search = () => {

    // pegando o parametro da query
    const query = useQuery()
    const search = query.get("q")

  return (
    <div>
        <h2>Search</h2>
        <p>{search}</p>
    </div>
  )
}

export default Search