/**
 * The starting point of the application.
 *
 * @author Daniel Martinez lara
 * @version 1.0.0
 */
const setActiveGenreElementStyle = (
  id: number,
  setState: React.Dispatch<React.SetStateAction<number>>,
  oldId?: number
) => {
  const genreElementToActivate = document.querySelector(`div[id='${id}']`);
  const currentActiveElement = document.querySelector(`div[id='${oldId}']`);

  if (genreElementToActivate) {
    if (currentActiveElement) {
      currentActiveElement.removeAttribute("genre_active");
    }
    genreElementToActivate.setAttribute("genre_active", "true");
  }

  setState(id);
};

export default setActiveGenreElementStyle;
