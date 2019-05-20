import ru from './ru';
import en from './en';

const availableLanguages = {ru, en};
const language = window.navigator.language.split('-')[0];

export default availableLanguages[language] || en;
