import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons/faAngleDoubleRight';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons/faBriefcase';
import { faCar } from '@fortawesome/free-solid-svg-icons/faCar';
import { faChild } from '@fortawesome/free-solid-svg-icons/faChild';
import { faConciergeBell } from '@fortawesome/free-solid-svg-icons/faConciergeBell';
import { faFutbol } from '@fortawesome/free-solid-svg-icons/faFutbol';
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome';
import { faMobileAlt } from '@fortawesome/free-solid-svg-icons/faMobileAlt';
import { faPaw } from '@fortawesome/free-solid-svg-icons/faPaw';
import { faSign } from '@fortawesome/free-solid-svg-icons/faSign';
import { faTshirt } from '@fortawesome/free-solid-svg-icons/faTshirt';

const icons: { [key: string]: IconProp } = {
    business: faBriefcase,
    fashion: faTshirt,
    for_home: faHome,
    hobbies: faFutbol,
    kids: faChild,
    other: faAngleDoubleRight,
    pets: faPaw,
    real_estate: faSign,
    services: faConciergeBell,
    technics: faMobileAlt,
    transport: faCar,
};

export default icons;
