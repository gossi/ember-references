import { Formatter } from 'ember-references/components/references/formatter';
import Person from 'ember-references/models/person';
import Reference from 'ember-references/models/reference';

export default class ApaFormatter implements Formatter {
  sort(references: Reference[]): Reference[] {
    return references.sort((a, b) => {
      let amountCmp;

      if (a.authors.length === b.authors.length) {
        amountCmp = 0;
      } else {
        amountCmp = a.authors.length > b.authors.length ? 1 : -1;
      }

      const getName = (person: Person) => {
        if (person.name) {
          return person.name;
        }

        return person.family;
      };

      const getSecondName = (person: Person) => {
        if (person.name) {
          return person.name;
        }

        return person.given;
      };

      let cmp = 0;
      let i = 0;
      do {
        const nameA = getName(a.authors[i]);
        const nameB = getName(b.authors[i]);
        cmp = nameA.localeCompare(nameB);

        if (cmp === 0) {
          const secondNameA = getSecondName(a.authors[i]);
          const secondNameB = getSecondName(b.authors[i]);
          cmp = secondNameA.localeCompare(secondNameB);

          if (cmp === 0) {
            cmp = amountCmp;
          }
        }
        i++;
      } while (cmp === 0 && i < a.authors.length && i < b.authors.length);
      return cmp;
    });
  }

  fixYear(references: Reference[]): Reference[] {
    return (
      references
        // reset year suffix
        .map(r => {
          return {
            ...r,
            yearSuffx: ''
          };
        })

      // // set suffix if two publications from the same author in the same year
      // .map((r) => r)
    );
  }
}
