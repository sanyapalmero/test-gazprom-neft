import '../scss/index.scss';

import { renderGroups } from "./components/groups";


let groups = document.getElementById('groups') as HTMLElement;
renderGroups(groups);
