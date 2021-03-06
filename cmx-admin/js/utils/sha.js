/*
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
 * in FIPS PUB 180-1
 * Version 2.1a Copyright Paul Johnston 2000 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for details.
 */
var hexcase=0,b64pad="",chrsz=8;function hex_sha1(a){return binb2hex(core_sha1(str2binb(a),a.length*chrsz))}function b64_sha1(a){return binb2b64(core_sha1(str2binb(a),a.length*chrsz))}function str_sha1(a){return binb2str(core_sha1(str2binb(a),a.length*chrsz))}function hex_hmac_sha1(a,b){return binb2hex(core_hmac_sha1(a,b))}function b64_hmac_sha1(a,b){return binb2b64(core_hmac_sha1(a,b))}function str_hmac_sha1(a,b){return binb2str(core_hmac_sha1(a,b))}
function sha1_vm_test(){return"a9993e364706816aba3e25717850c26c9cd0d89d"==hex_sha1("abc")}
function core_sha1(a,b){a[b>>5]|=128<<24-b%32;a[(b+64>>9<<4)+15]=b;for(var c=Array(80),d=1732584193,e=-271733879,f=-1732584194,h=271733878,i=-1009589776,j=0;j<a.length;j+=16){for(var k=d,l=e,m=f,n=h,p=i,g=0;80>g;g++){c[g]=16>g?a[j+g]:rol(c[g-3]^c[g-8]^c[g-14]^c[g-16],1);var q=safe_add(safe_add(rol(d,5),sha1_ft(g,e,f,h)),safe_add(safe_add(i,c[g]),sha1_kt(g))),i=h,h=f,f=rol(e,30),e=d,d=q}d=safe_add(d,k);e=safe_add(e,l);f=safe_add(f,m);h=safe_add(h,n);i=safe_add(i,p)}return[d,e,f,h,i]}
function sha1_ft(a,b,c,d){return 20>a?b&c|~b&d:40>a?b^c^d:60>a?b&c|b&d|c&d:b^c^d}function sha1_kt(a){return 20>a?1518500249:40>a?1859775393:60>a?-1894007588:-899497514}function core_hmac_sha1(a,b){var c=str2binb(a);16<c.length&&(c=core_sha1(c,a.length*chrsz));for(var d=Array(16),e=Array(16),f=0;16>f;f++)d[f]=c[f]^909522486,e[f]=c[f]^1549556828;c=core_sha1(d.concat(str2binb(b)),512+b.length*chrsz);return core_sha1(e.concat(c),672)}
function safe_add(a,b){var c=(a&65535)+(b&65535);return(a>>16)+(b>>16)+(c>>16)<<16|c&65535}function rol(a,b){return a<<b|a>>>32-b}function str2binb(a){for(var b=[],c=(1<<chrsz)-1,d=0;d<a.length*chrsz;d+=chrsz)b[d>>5]|=(a.charCodeAt(d/chrsz)&c)<<32-chrsz-d%32;return b}function binb2str(a){for(var b="",c=(1<<chrsz)-1,d=0;d<32*a.length;d+=chrsz)b+=String.fromCharCode(a[d>>5]>>>32-chrsz-d%32&c);return b}
function binb2hex(a){for(var b=hexcase?"0123456789ABCDEF":"0123456789abcdef",c="",d=0;d<4*a.length;d++)c+=b.charAt(a[d>>2]>>8*(3-d%4)+4&15)+b.charAt(a[d>>2]>>8*(3-d%4)&15);return c}function binb2b64(a){for(var b="",c=0;c<4*a.length;c+=3)for(var d=(a[c>>2]>>8*(3-c%4)&255)<<16|(a[c+1>>2]>>8*(3-(c+1)%4)&255)<<8|a[c+2>>2]>>8*(3-(c+2)%4)&255,e=0;4>e;e++)b=8*c+6*e>32*a.length?b+b64pad:b+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(d>>6*(3-e)&63);return b};
