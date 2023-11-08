//1.
// Zadeklaruj odpowiednie typy dla zmiennych, biorąc pod uwagę przypisywane do nich wartości
// Koniecznie przygotuj enum dla ról użytkowników i skorzystaj z niego przy `userRole`.

let foo: number | null = 5;
foo = 10;
foo = null;

let bar: string = 'Foobar!';
bar = 'test';

let num: number | string | null = 5;
num = '6';
num = null

enum UserRole {
  Admin = 'admin',
  User = 'user',
  Moderator = 'moderator',
}

let userRole: UserRole = UserRole.Admin;
userRole = UserRole.User;
userRole = UserRole.Moderator;

let userIsLogged: boolean = true;
userIsLogged = false;

//2.
// Skonkretyzuj poniższy kod.
// Wszystkie trzy obiekty `userOne`, `userTwo` i `userThree` powinny korzystać z jednego typu, który nalezy nazwać `User`.
// Jaka powinna być jego struktura? Żeby to ustalić, oprzyj się na aktualnej zawartości tych obiektów.
// Nie musisz korzystać tylko z wbudowanych typów, możesz (a nawet musisz) dodać również własne.

// Uwaga:
// 1. `role` nie powinno być opisywane bezpośrednio jako `'admin' | `moderator' | `user`. Zamiast tego skorzystaj z `enum` przygotowanego w zadaniu pierwszym.
// 2. Tablica `users` musi być odpowiednio otypowana! Ma to być tablica obiektów typu `User`.
// 3. `isLogged` powinno być właściwością opcjonalną. Możesz to zrobić identycznie, jak w przypadku opcjonalnych parametrów funkcji – `isLogged?: boolean`.
// 4. `numbers` powinno być potraktowane jako "sztywna" tablica, która zawsze ma mieć dokładnie taką strukturę jak teraz,
// a więc posiadać dokładnie trzy elementy, gdzie dwa pierwsze powinny być numberem, a trzeci stringiem.


type User = {
  login: string;
  email: string;
  age: number;
  role: UserRole;
  isLogged?: boolean;
};

const userOne: User = {
  login: 'user1',
  email: 'user1@gmail.com',
  age: 20,
  role: UserRole.Admin,
  isLogged: true,
};

const userTwo: User = {
  login: 'user2',
  email: 'user2@gmail.com',
  age: 30,
  role: UserRole.Moderator,
};

const userThree: User = {
  login: 'user3',
  email: 'user3@gmail.com',
  age: 40,
  role: UserRole.Admin,
};

const users: User[] = [userOne, userTwo, userThree];

const numbers: [number, number, string] = [5, 8, '8'];

const arr: [string, UserRole, number] = ['John', UserRole.Admin, 20];

//3.
// Skonkretyzuj deklaracje funkcji, tak aby TS wiedział, czego powinien spodziewać się po argumentach, a także jaki będzie typ zwracanej wartości.
// Wciąż pracujemy tu na tablicy `users` z zadania drugiego, więc możesz korzystać z typu `User` tam, gdzie uznasz to za stosowne.
// Dla ambitnych: Spróbuj odnaleźć w dokumemtacji TS-a konstrukcję `keyof` i wykorzystać ją do otypowania parametrów funkcji, tam gdzie jest to możliwe.

const addUser = (login: string, email: string, age: number, role: UserRole): User => {
  const user: User = { login, email, age, role };
  users.push(user);
  return user;
};

type AddUserParams = {
  login: string;
  email: string;
  age: number;
  role: UserRole;
};

const addUserWithKeyof = ({ login, email, age, role }: AddUserParams): User => {
  const user: User = { login, email, age, role };
  users.push(user);
  return user;
};


const removeUser = (paramName: keyof User, paramValue: any): boolean => {
  const index = users.findIndex(user => user[paramName] === paramValue);
  if (index !== -1) {
    users.splice(index, 1);
    return true;
  }
  return false;
};

const addUsers = (...newUsers: User[]): void => {
  for (const user of newUsers) {
    addUser(user.login, user.email, user.age, user.role);
  }
};

const getUser = (paramName: keyof User, paramValue: any): User | undefined => {
  return users.find(user => user[paramName] === paramValue);
};

//4.
// Funkcja `parseField` powinna przyjmować albo tekst albo wiek.
// Jeśli otrzyma tekst, powinna sparsować go przy użyciu funkcji `parseEmail`.
// Jeśli liczbę, to powinna potraktować ją jako wiek i użyć funkcji `parseAge`.
// Same funkcje `parseEmail` i `parseAge` są już gotowe i nie musisz ich w żaden sposób modyfikować.
// Zadbaj jednak o to, aby skonkretyzować funkcję `parseField`. Zadeklaruj jakiego typu oczekujemy w `fieldValue`, a także co będzie zwracane.
// Dodatkowo korzystając z "type guards" (if, typeof itd.), zmodyfikuj tę funkcję tak, aby uruchamiała tylko `parseEmail` albo tylko `parseAge`,
// zależnie od tego, jaki jest typ `fieldValue` przy konkretnym wywołaniu.


const parseEmail = (val: string): string => { return val; }
const parseAge = (val: number): number => { return val; }

const parseField = (fieldValue: string | number): string | number => {
  if (typeof fieldValue === 'string') {
    return parseEmail(fieldValue);
  } else if (typeof fieldValue === 'number') {
    return parseAge(fieldValue);
  } else {
    return fieldValue;
  }
};

//5.
// Skonkretyzuj funkcję `titleClickHandler`. Zadbaj o to, aby TS wiedział iż `this` będzie w niej wskazywał na pewno na `HTMLButtonElement`.
// Upewnij go również o tym, że `inputElem` zostanie znaleziony i jest to zwykły input (`HTMLInputElement`)

const titleClickHandler = function(this: HTMLButtonElement) {
  this.addEventListener('click', () => {
    console.log('Kliknieto po operacji...');
  });
  const inputElem = document.querySelector('.input-elem') as HTMLInputElement | null;
  if (inputElem) {
    inputElem.value = 'Gotowe!';
  }
};