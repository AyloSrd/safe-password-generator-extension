export default  class PasswordGenerator {
    constructor() {
        this.lowercase = 'abcdefghijklmnopqrstuvwxyz'
        this.uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        this.numbers = '0123456789'
        this.symbols = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'
        this.password = ''
    }

    generate = (params, length) => {
        this.password = params.reduce((psw, p) => psw + this[p].charAt(Math.floor(Math.random() * this[p].length)), '')
        if (length) {
            const all = params.reduce((psw, p) => psw + this[p], '')
            for (let i = 0; i < length; i++) {
                this.password += all.charAt(Math.floor(Math.random() * all.length))
            }
        }
        const provPswd = this.password.split('')
        for (let i = provPswd.length - 1; i > 0; i--) {
             const j = Math.floor(Math.random() * (i + 1))
             const temp = provPswd[i]
             provPswd[i] = provPswd[j]
             provPswd[j] = temp
        }
        this.password = provPswd.join('')
        return this.password
    }
}

/*
const lowercase = 'abcdefghijklmnopqrstuvwxyz';
const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers = '0123456789';
const symbols = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
const all = `${lowercase}${uppercase}${numbers}${symbols}`.split()
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
let allRandom = [...all]
shuffleArray(allRandom)
*/

/*
const all = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "!", '"', "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", ":", ";", "<", "=", ">", "?", "@", "[", "\\", "]", "^", "_", "`", "{", "|", "}", "~"]

const allRandom = ["n", "#", "h", "$", "&", ")", "u", "P", ",", "`", "4", "M", "G", "v", "|", "s", "p", "<", "l", "k", "B", ">", "f", "D", "N", "*", "g", "a", "%", "S", ":", "L", "0", "b", "7", "@", "H", "m", "?", ".", "-", "E", "d", "I", "~", "O", "3", "+", "]", ";", "V", "y", "8", "K", "Q", "(", "C", "Z", "o", "1", "\\", "w", "9", "W", "A", "t", "[", "=", "2", "R", "5", "Y", "x", "c", "^", "F", "J", "q", "X", "/", "i", "}", "6", '"', "_", "e", "j", "U", "r", "{", "!", "'", "T", "z"]

const crypto = {}
const unCrypto = {}

for(let i = 0; i < all.length; i++){
    crypto[all[i]] = allRandom[i] 
    unCrypto[allRandom[i]] = all[i]
}
*/

/*
crypto = {
    0: "8"
1: "K"
2: "Q"
3: "("
4: "C"
5: "Z"
6: "o"
7: "1"
8: "\\"
9: "w"
!: "9"
": "W"
#: "A"
$: "t"
%: "["
&: "="
': "2"
(: "R"
): "5"
*: "Y"
+: "x"
,: "c"
-: "^"
.: "F"
/: "J"
:: "q"
;: "X"
<: "/"
=: "i"
>: "}"
?: "6"
@: '"'
A: "g"
B: "a"
C: "%"
D: "S"
E: ":"
F: "L"
G: "0"
H: "b"
I: "7"
J: "@"
K: "H"
L: "m"
M: "?"
N: "."
O: "-"
P: "E"
Q: "d"
R: "I"
S: "~"
T: "O"
U: "3"
V: "+"
W: "]"
X: ";"
Y: "V"
Z: "y"
[: "_"
\: "e"
]: "j"
^: "U"
`: "{"
a: "n"
b: "#"
c: "h"
d: "$"
e: "&"
f: ")"
g: "u"
h: "P"
i: ","
j: "`"
k: "4"
l: "M"
m: "G"
n: "v"
o: "|"
p: "s"
q: "p"
r: "<"
s: "l"
t: "k"
u: "B"
v: ">"
w: "f"
x: "D"
y: "N"
z: "*"
{: "!"
|: "'"
}: "T"
~: "z"
_: "r"
}
*/