'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "version.json": "3906fc5d38199c243ab81a45fee32c66",
"index.html": "d85ce9eeb39063b1ac1c90f692a0a06b",
"/": "d85ce9eeb39063b1ac1c90f692a0a06b",
"main.dart.js": "8df98b7445c823d2541b5f22478c6db3",
"icons/title_icon.png": "35bacee22867aacd817c13f1b9b6c9f7",
"icons/logo-aerium-1.png": "c9c1749b275f61ebc563d6596ccf2569",
"icons/logo-aerium-2.png": "58b131c1e81194452cb702693c040a92",
"manifest.json": "2e28cebc1e27a999e5b0da349afad267",
".git/config": "258f055618bc55c586f175a1a82cb42e",
".git/objects/61/6f3e50d1ffa7afecca4dec480b2c83b2242246": "58a7e320cfe1c286e8be223641277205",
".git/objects/0d/0df08f7c3e147a8ae36017cf81a96e35b73717": "106e868f28a72727fb6fb0fa71123633",
".git/objects/59/d02356c001abaf3d68d3854813e8ef3d413d1a": "295c11faa9044a848245c0ea77158f8b",
".git/objects/66/6b1a6d66833196ec1ce4f5f7b30ef1bd26ec58": "c1d7b7bf6eb105b0d07989283faf9e0b",
".git/objects/50/7305270833888c4d7b2aa7e3289770654a26ce": "78d84d4b9ca83bdac54aa0362b8b501d",
".git/objects/68/68f7bb64ba71b131690286ddc82aa0f542293e": "b6aeab417f5d5ef28ea070a09b61c7e0",
".git/objects/03/c9f767a4f7e7a37bf8769ec87d5170883bcf57": "6069b0be02c692b7d52c669853618abf",
".git/objects/32/bdef0d81a2d4909dc1c5656c2905bd457ab65c": "787955b3004e1ef62ba5975afb519dc2",
".git/objects/35/781c0b7bb87671bedf8de5f4c532e771d5f071": "68fdff750256c440a0a00069b4d68da4",
".git/objects/35/acda2fa1196aad98c2adf4378a7611dd713aa3": "b485406370fdb56248ec4e5fc074fb65",
".git/objects/69/283e182bc52dd3408c8d6285c122e4fd604049": "ae8d8f14a47140c6743bdb4d00ec8b19",
".git/objects/3c/35062fd2ffd1ed3f5532628fc696699af0eed8": "d0c6ca2d6c692be75d24920b1f07c03b",
".git/objects/51/db7b06704b69c7579220024a9e4472b0efa4d4": "50dbff61cdd2418887daef62d5ba9580",
".git/objects/51/d9901e06bfa7ac3c18012ac7330a6bd26f62f5": "5549e3a32f75b69895f6b40c6a257016",
".git/objects/51/268fb6a556805ef0383d402479f78d247602b2": "f3a89e11928e72f925e53bf6a3efb82d",
".git/objects/67/bd84202ad5b2e307d3b6fac1731c2a5d963e0b": "aa161ace139f434c81be219b6f6205e5",
".git/objects/0b/0845d03003bfc6d8124b7caac9411433d50066": "c808ea9f6dc714f02ba0537796700a12",
".git/objects/0b/49615d68ec3a6337b194e5f807824997836e3e": "af97fff5322d5aa1a2b7be66c566d4ef",
".git/objects/0b/bf0a61f7e514e0b5fb491d7d601c67262f1a0b": "5242a281ac96873b6411ee7da3c8f48f",
".git/objects/93/7e01f7c59a88565b0abcabcca2a68e55de8cc1": "232477654ae972c17ae9cc2fec868c0a",
".git/objects/94/8f0a5d26e899539e7821aa5a500932f76ba582": "e9093d046b81c96e5fd46a48a0b68b11",
".git/objects/5f/72e9127ffaae2a500cd9d950067f46c21b277c": "9334d3373cb9fc449377becf4cba5477",
".git/objects/9c/2e4df5e26db7156a27b9e8aa0205935f84c7e6": "1ee126cd5c2626fd19204db668f4008d",
".git/objects/9c/7c318dcfe9d9a3dc379701992e0d7285eea21c": "c9bed9a4fcd761f405ca3439a66a89b6",
".git/objects/02/bb649b1bc1346bb423cb3aa144af0907780c1d": "06a05d9ba243c48576fced5eb99bdf89",
".git/objects/a4/2a914aaa748510840496fe9429d50ffaf642fd": "a854b4456cbeb1ad22308e33f163bd7b",
".git/objects/a3/09313d5fb20765dff1d8f41dbd72c558097611": "ce77a88cc2b115d907f98afb245fa5f6",
".git/objects/b2/46e690db9d5ada198b6baf9bd41f89c8dc8646": "0865ce9c00c43affea7dc594a8360146",
".git/objects/d9/358116aecd0bdb053326d73b7d6a496354d281": "b559e13011072fb95a20014bf886143f",
".git/objects/bb/7493e34253fda69f060e2322215492bed80893": "1ac06b867e7f1a25507a16c3b43b3ef3",
".git/objects/d0/03a53106e1ade6309cf2760ecc84a8366cd26b": "474300794b39665fadd6d307c29e5463",
".git/objects/df/78df02021bb98e27e985dc13e387bcd59295ac": "2b5bdc9e9adec8937483c898e2c0ba18",
".git/objects/df/ad34fa39c36af0233e4a550062ad885df7a502": "3648e9a7c340c26575f2dc2c735e7e86",
".git/objects/d1/87bfaeee22e5aadcedaac204505e8e4de50252": "e48348623163f35030a6f3a50d7f643d",
".git/objects/e5/c9d96da8b9e29f68c3f6ff2567a2450bb4f4bb": "9e899d00366f26081308465556f2b010",
".git/objects/e5/951dfb943474a56e611d9923405cd06c2dd28d": "c6fa51103d8db5478e1a43a661f6c68d",
".git/objects/e2/b236051d67f71b884034f0694884e55b7852ab": "9f03621399d5783672eb673cd4580bda",
".git/objects/c7/24ee7ee268185f5f605e22b8d9a66b571651ff": "2eaf8b2e78949e075aefebaffe889d3d",
".git/objects/c7/418817439b2f071c93a4a6cee831e996123c0b": "a973381dec3e0988db3e91122a03c303",
".git/objects/c0/fc036fd8ea781dfa33cfc90fe3824e2dd6c07c": "c76137749258399de3679f18321c091e",
".git/objects/fc/963dfe2292c4e241afb5950e063414d544c093": "8cd8693ced3c797431323a7707d38029",
".git/objects/f2/35c8073588c3916e414f3c462edfde122a5356": "956e9b466b9b20e3157e4b00544cd9e5",
".git/objects/f5/7b625f112188e381797bb7a6ed1f6fc1adbabc": "81c69db2da5399b85e9272a0d69ec0df",
".git/objects/f5/eaf7eb1511bd9532cebfae70e47524663de109": "50b1229f40423533da8629dc65d38889",
".git/objects/cf/e2d9f8fd1f1602ac2944104150deb151250322": "138cd42be5f7f5389f94211921b22a97",
".git/objects/e4/ae46c6286b2d6c6676b0c3192fc92876778498": "c1fb9fd9132eb732a1d95b1d7a283648",
".git/objects/c8/df92b853992397794e13e57140bbab28367e15": "4e587a7e4ba7acfc9ac1796c5c862e78",
".git/objects/ed/0b614210f524301598efdd7ee04840743e6911": "bd2dcefedc2ec0d9e120744748d80cc7",
".git/objects/4e/89617a3696bd10c155ec378f4a65a9f89e9e3a": "d8056e20bae90d092b619c895129e982",
".git/objects/20/67116ebace2e7cc7f0dc28a1e7035d938b3054": "d47b406b850ce1df0ae8a6dd89727768",
".git/objects/27/a5217b7ce6744bd4da48dfc6dce7649040446d": "c0d49c3f9d4e1f21c1996663e64f6671",
".git/objects/4b/b75d9f5d377be5347ac4af02f57bb5674b893d": "1d52de4f5b08539b98edb04fabb60d8f",
".git/objects/7d/f52caf418e4e8a57c8e6900f91fd37c916c097": "56171212133719c74fbfd4d40920aa7a",
".git/objects/7d/2d12977bb3e3d555f613989d6c770735fad1d7": "9bcd1f78e3f5cd219c50a974858a3e03",
".git/objects/1f/9dea86d49da71f095111707d03b9140eb69733": "0bd4fa0f40267bf0e6d88529e788d60b",
".git/objects/87/218e518a0d4ac26241aaa5cee16b5697be7bea": "95745373b87a5ce9d1d39c0499c9af76",
".git/objects/8a/fafde6a649662e31637d54d02d0834a615e7dc": "7bf0843ee42b9cc5d9c6f63909892fec",
".git/objects/7e/ce3282a4f7824b249d9e568819d98bd2fa3da6": "8c71b613b9912dfd1fdf473a52e99214",
".git/objects/10/df1e0400dd243001a99d9c5c12aa28f33cc880": "e65f838bbf0ac61fdd56818bd3a36969",
".git/objects/75/dccf3156f77002f47e39d90de32d41645f7e32": "41c9684a59b97a88f8b4e45d6f24e6bf",
".git/objects/81/89788e47f36329a5b94dd046b1fd7836feeef6": "0082bd62cec1d5ff38f82e5b7a6e9c88",
".git/objects/44/97f71d685d551ba6ee7dc82b32987508762276": "02459aac0e513e33dc1d8d1597b4037d",
".git/objects/2a/bf03542c17e6f7a7806a226c3be732b51c5a40": "4593012a42df8795cd0ae089a5b7aaaf",
".git/objects/2f/3e65ce9ff2d7fb4e5e1e03798c28b7aeea735a": "c21e1ab6c46845c6b99e64bd8ce1314b",
".git/objects/43/1cb6c0007f9b28879e7d3513b101a61c813c38": "a5aa95f226dbcca106d7c1cb2537c89d",
".git/objects/88/a5796c795b9c62be2e1eac970c0a2d64de3c70": "03ae40777fa5a91486fcd87bee9f75be",
".git/objects/6b/c4279d1a0080cc086a9c38aded303e7d7ed015": "69d42847957a4569a23976db08abbcb0",
".git/objects/00/ca18384cc1e59a0b12f6cb3dd6f804d06036e2": "bdacff18273514283c2548e1f9e17806",
".git/objects/6e/cb68683477ecc5aed38ec3fc8910d9bb66276c": "8081799c6f0d89b405c8cca2b18cd6da",
".git/objects/6e/a90fe7c0ea7f6d9675b7d3a7537e1097fda9de": "80f9a302fe88b171aafd9107f07252be",
".git/objects/5d/e0abfe7c9420d68998664d68e3c02faf9e98e6": "bdafc81131f41b889def5d6daf685601",
".git/objects/31/5ef0db4699aaddf86e083ce02c3c5754bce5b4": "d12bce5ff9d12422e103a14cf2b4cb0d",
".git/objects/62/0a3c5ee26413a33ec53cab5fbe5ba2dd4524ba": "00362d9334923933d842984499d7abbf",
".git/objects/62/e94efb520dcbd664c7a6f92070fa77cd43d9eb": "9da5d155b755cc97eaca8ebd4aefe21f",
".git/objects/96/125180285f7dd2008f90f03fce3f4c4de50ba8": "128ab3fec40348f6ace042809950c089",
".git/objects/3a/9464fb58c9a16fb2de1ee439d5e5df1b6d579e": "0f2167c309b5b9c9980f79f8a43bf9b7",
".git/objects/98/e579d3c241753a3f2a49b998fd4a15bdcdebfc": "3ada5b6305e482c269a788d1609e2cb8",
".git/objects/53/f96318bab3160806fcdf2929e044a8b43adf3d": "8229acac5c26f1e255baed8e6f55bdf5",
".git/objects/3f/fb60696943799ee726172dfe77b1ca69ec6515": "a400e443bb882434d4f5601a05b450ae",
".git/objects/5b/9ef37e54317fcda12e3192106451fb72f274cf": "fa33db849081e9f1d4d53ff2828b0f77",
".git/objects/5b/94c0d946e0a8d1a03f38e7e5844ed552ad6674": "3972704c15ef5a24509ac4e2376c0851",
".git/objects/6d/f4d689fb40c76cb01286cc1b2f7e83ab5d8f6e": "65bf0955957cd1cc0b56cc92d9aeeb6e",
".git/objects/01/8b6f831e5a74082faccf1a4652bbbbed9cf051": "c98a13cfd7085fd2da76546bbf825ebf",
".git/objects/06/d0153c1acef153c815a74a1bb3838e04392ea1": "4d845676d78a11928ba5c471cb0273b5",
".git/objects/6c/ce217ddc2efe3411dc9fa34e294e48e4cdf4f5": "8a6cc32e7f23f25e611213b06bb38448",
".git/objects/52/480a63b1f184ea74afb06662aa98fa98864864": "6f8b2cf71be2b4830601f9db57eded45",
".git/objects/52/d40178f9987eb3b24ef05d450f40f93effae89": "553ce4c6a46c2c2ac10d6da7e945e8da",
".git/objects/0f/fe00b92b2e2d21c1f33024760f685cbb7ffdb8": "6655e717f185770489b36816ed0d52de",
".git/objects/90/4509b52fc82981fafba3f4f8db0805f4710a2d": "8303613e11b575a2d38acc159e135da5",
".git/objects/90/22cf8edf0404e80818dd62aeb6e31bad4dec42": "70b3b08950f1741b2532caeb93cade31",
".git/objects/a0/cf89abe78d3d12d6006c0150a54aab389bd855": "ad8690625bfbcccd0e6936254518f5cd",
".git/objects/a7/78834856a0c052c715b614dcf5f3b41b3a503d": "5e6bd2fea6dd6b8cab520e3fc0562e1d",
".git/objects/b8/9d10e8fc03005f05a3bff564ad5a40d9108602": "837cab451f3e8b1ef4f0dc62fcd2068d",
".git/objects/b1/dfc7c84030bf24baaf45dedf62031cc7186cd8": "016ad5784f08c910bc19c10cd65e6ea8",
".git/objects/dd/bad770f3746429c40ba42b8afdd181a7fc700f": "11677e8d5ae6a1c5418a1d6a276d7774",
".git/objects/dc/fd360b1fc0859c3aac7df510a7ba4e5be78503": "7f9127dc3662138da3440e067b642050",
".git/objects/b6/ebf0c25b086885fbfdb1061be1dbd0ba07d131": "1f553a811e76a3ed3d6fed4501e7722c",
".git/objects/aa/fa49c5f394fe39c532c1c76226a97142120793": "da3df9af7bc26a60918de68e2d4b6a4a",
".git/objects/a8/7fa15217fcb3c2f8afcf6cb2a3f024ca896fee": "e5e275a51179ec26a404fbbcaecbe967",
".git/objects/b9/116afd66363dbd8b1ad3a673dbb6a84e5d3d63": "72e00218aeb12707bf86f3c48b222d8e",
".git/objects/a1/3837a12450aceaa5c8e807c32e781831d67a8f": "bfe4910ea01eb3d69e9520c3b42a0adf",
".git/objects/c3/a3d3d3283e2313751080267db96ab2f65e7d0a": "473c5069b097732ecb8993aa4ae46815",
".git/objects/ea/b3013e499bc13fd1e2dd3ec60042059c3c01ad": "1504e7050651d868ab5012b8e72a40d4",
".git/objects/ea/b2789d79a9ab3f6ebe19fa89d1a37b9bf154fd": "0950eca0e5b88abdb9bd6875b3fe2d7e",
".git/objects/cd/0446b9be90a395efca03b603967c35d91244e3": "168a9d99db6e375f822a5a2af3fa7ee1",
".git/objects/cc/9090b726229485a944ee9436aac3fb63c3e044": "0b5baef64a69379be975af442e3133aa",
".git/objects/f9/08613affab797a30ca21b2b9712cf557590f80": "94c99c34eaec03ab38f8d83a0dc362a6",
".git/objects/f7/7c71d1c79505b88cc75bad2275f794b34b6945": "4f72abceecdb1588d88ab0f7ea6550f4",
".git/objects/c5/fd65468f47aa78747069bc4695e3591133e68b": "fe8d5adc7ea02b44aad115afc64e8843",
".git/objects/c2/82762e8db4fdf781e79a71dfe8da50cf02b7d9": "e9e751c19f57ab71a6ad1baceb8c2fa1",
".git/objects/e9/e575d0b36ebd696294496017834c26b62e1505": "8eca52e53d59927cc7c00a13888ea67b",
".git/objects/f1/59415d5f92e588efdef4dfd2e01a2f6e669570": "a19de0309ab06b4546cdec623f977a6b",
".git/objects/cb/ae46602150dbd8293fc2bfb2eef2957a56665a": "a8d4a07a75c1e3f853d22430ebd0d2cf",
".git/objects/e0/6516483ad31fdaf6163bc8aabcfcfe9919474e": "e3210e6c2bcf0d8748a6a2339a11979c",
".git/objects/79/ba7ea0836b93b3f178067bcd0a0945dbc26b3f": "f3e31aec622d6cf63f619aa3a6023103",
".git/objects/2d/cf3542c874e33cd8ab86ceb6f0ec444228aa78": "66baad0ae5d874f09b6eee790095bc65",
".git/objects/41/6741a8fe8140dc2785490237d3ea534d174c3c": "3023ec6a5d12cf99662cb17d86f2518f",
".git/objects/83/d39fde106aa6def166a91f81b0674c242afb07": "805c9e53cdc75a79b1117d63606e7daa",
".git/objects/70/15564ad166a3e9d88c82f17829f0cc01ebe29a": "b0b4eb8e40c5eaa3b07c9dcc175a4ab8",
".git/objects/1e/a77534aa78b23efbb6f9c755d54537553a6094": "d3b9f52f4f0d747fc508c32d38512901",
".git/objects/24/b1f14dd348b07c9b8373758bde9ac14d16fd92": "dbf45d6c044044561758a334420e9569",
".git/objects/12/c0e715f3d086f41138c88f097bd9a64df288de": "c057579f2170a6c547c8cd0305c50f5d",
".git/objects/12/9ace90d8749468e093e6ba2e3fea94023ca755": "7e51f2301589a1d56c71c33c5063653f",
".git/objects/71/c86f0090193848f6c956705409cb951cb11a15": "ffb3dfb4ce674436b9cfb4cb56916799",
".git/objects/76/8651b2e249c2517c7b37bdbeea0a5d8bfbb707": "495b1c4fefa633f6afe4dc5840ebe18f",
".git/objects/1c/8f5e910bfb1a4a2871eeedc6eae01ca25e7ce1": "7d52f9ae3b3fac811829018aea2c668f",
".git/objects/8b/137891791fe96927ad78e64b0aad7bded08bdc": "9abb042e8c58ed4d703beb8e66b37150",
".git/objects/13/d6591a295bbee95ef0e1d301ffd6191fb1562a": "45572365c53ff4c75f913c6c8dc5ca74",
".git/objects/7a/0bf3307695fdacd1c6247daafa435599641587": "7fa14d07b9ad603ea0b40823edebed0c",
".git/objects/25/ff4bb8e13dbca18873abc8dc12d5e5c3edebe8": "585c9c42a0267a30e5f89427e9bf4e73",
".git/HEAD": "4cf2d64e44205fe628ddd534e1151b58",
".git/info/exclude": "036208b4a1ab4a235d75c181e685e5a3",
".git/logs/HEAD": "5d9a21fc73640addd09c556569409542",
".git/logs/refs/heads/master": "5d9a21fc73640addd09c556569409542",
".git/logs/refs/remotes/origin/main": "b37e8c8322cb53738d60c8b2fc2f7d5c",
".git/description": "a0a7c3fff21f2aea3cfa1d0316dd816c",
".git/hooks/commit-msg.sample": "579a3c1e12a1e74a98169175fb913012",
".git/hooks/pre-rebase.sample": "56e45f2bcbc8226d2b4200f7c46371bf",
".git/hooks/pre-commit.sample": "305eadbbcd6f6d2567e033ad12aabbc4",
".git/hooks/applypatch-msg.sample": "ce562e08d8098926a3862fc6e7905199",
".git/hooks/fsmonitor-watchman.sample": "ea587b0fae70333bce92257152996e70",
".git/hooks/pre-receive.sample": "2ad18ec82c20af7b5926ed9cea6aeedd",
".git/hooks/prepare-commit-msg.sample": "2b5c047bdb474555e1787db32b2d2fc5",
".git/hooks/post-update.sample": "2b7ea5cee3c49ff53d41e00785eb974c",
".git/hooks/pre-merge-commit.sample": "39cb268e2a85d436b9eb6f47614c3cbc",
".git/hooks/pre-applypatch.sample": "054f9ffb8bfe04a599751cc757226dda",
".git/hooks/pre-push.sample": "2c642152299a94e05ea26eae11993b13",
".git/hooks/update.sample": "647ae13c682f7827c22f5fc08a03674e",
".git/hooks/push-to-checkout.sample": "c7ab00c7784efeadad3ae9b228d4b4db",
".git/refs/heads/master": "6f6baeaab1af13e83f630920e60399c0",
".git/refs/remotes/origin/main": "282dd523670f604f103661c68773c256",
".git/index": "23b2b7efca16763ff66b92077ca7b073",
".git/COMMIT_EDITMSG": "1b463b0b3076e34782f2770ff2b617b1",
".git/FETCH_HEAD": "7b342eeced44a4da42c0dd56ac72150b",
"assets/AssetManifest.json": "8fa1f06be26a7f7930cac20e2b15f300",
"assets/NOTICES": "02a2a7014223940ee6ed0094ae79198a",
"assets/FontManifest.json": "56470306171508d0b27b61a747ae2440",
"assets/packages/flutter_neumorphic/fonts/NeumorphicIcons.ttf": "32be0c4c86773ba5c9f7791e69964585",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/packages/flutter_icons/fonts/Octicons.ttf": "73b8cff012825060b308d2162f31dbb2",
"assets/packages/flutter_icons/fonts/Feather.ttf": "6beba7e6834963f7f171d3bdd075c915",
"assets/packages/flutter_icons/fonts/Entypo.ttf": "744ce60078c17d86006dd0edabcd59a7",
"assets/packages/flutter_icons/fonts/FontAwesome5_Brands.ttf": "c39278f7abfc798a241551194f55e29f",
"assets/packages/flutter_icons/fonts/MaterialCommunityIcons.ttf": "3c851d60ad5ef3f2fe43ebd263490d78",
"assets/packages/flutter_icons/fonts/AntDesign.ttf": "3a2ba31570920eeb9b1d217cabe58315",
"assets/packages/flutter_icons/fonts/Foundation.ttf": "e20945d7c929279ef7a6f1db184a4470",
"assets/packages/flutter_icons/fonts/weathericons.ttf": "4618f0de2a818e7ad3fe880e0b74d04a",
"assets/packages/flutter_icons/fonts/Ionicons.ttf": "b2e0fc821c6886fb3940f85a3320003e",
"assets/packages/flutter_icons/fonts/FontAwesome5_Solid.ttf": "b70cea0339374107969eb53e5b1f603f",
"assets/packages/flutter_icons/fonts/FontAwesome5_Regular.ttf": "f6c6f6c8cb7784254ad00056f6fbd74e",
"assets/packages/flutter_icons/fonts/FontAwesome.ttf": "b06871f281fee6b241d60582ae9369b9",
"assets/packages/flutter_icons/fonts/Zocial.ttf": "5cdf883b18a5651a29a4d1ef276d2457",
"assets/packages/flutter_icons/fonts/EvilIcons.ttf": "140c53a7643ea949007aa9a282153849",
"assets/packages/flutter_icons/fonts/SimpleLineIcons.ttf": "d2285965fe34b05465047401b8595dd0",
"assets/packages/flutter_icons/fonts/MaterialIcons.ttf": "a37b0c01c0baf1888ca812cc0508f6e2",
"assets/packages/font_awesome_flutter/lib/fonts/fa-solid-900.ttf": "dd3c4233029270506ecc994d67785a37",
"assets/packages/font_awesome_flutter/lib/fonts/fa-regular-400.ttf": "613e4cc1af0eb5148b8ce409ad35446d",
"assets/packages/font_awesome_flutter/lib/fonts/fa-brands-400.ttf": "d1722d5cf2c7855862f68edb85e31f88",
"assets/packages/flutter_feather_icons/fonts/feather.ttf": "c96dc22ca29a082af83cce866d35cebc",
"assets/fonts/MaterialIcons-Regular.otf": "7e7a6cccddf6d7b20012a548461d5d81",
"assets/assets/images/Weather_app.png": "301845b38a1075cdbc1f4899e9380755",
"assets/assets/images/try.json": "0cda244695a98607badf94ea422474a3",
"assets/assets/images/DAVID_COBBINA_CV.pdf": "0516a6d443027d43295e07518ea5c67a",
"assets/assets/images/title_icon.png": "35bacee22867aacd817c13f1b9b6c9f7",
"assets/assets/images/todo.png": "6351feb905c73d27da461a7da8f49e07",
"assets/assets/images/ACE.png": "f6a58ceec0234246165dccde524fbf24",
"assets/assets/images/Bhavuk.png": "babdb0b37eb85ad9d94965c92503a322",
"assets/assets/images/Portfolio.png": "2f749c20498abcdb6ed6720aa95eba01",
"assets/assets/images/BMI_CAL.png": "4cd6fe9cd0738a4f4e83752e876b1b4e",
"assets/assets/images/Messenger.png": "7d186e630866377c5e295a5812dbbf98",
"assets/assets/images/Panzer.png": "525a77ded998cf2b534d4ce2110bedcd",
"assets/assets/images/23d.png": "a04979d6538f11057712722d1452b65d",
"assets/assets/fonts/circe/Circe-Light.ttf": "9fd3216596f21252abbdbc053769134e",
"assets/assets/fonts/circe/Circe-Bold.ttf": "22f16521a7d16c7f8342680cf30b46bd",
"assets/assets/fonts/circe/Circe-Thin.ttf": "8a6928dabfc92fdf4fa5fa4f53534cab",
"assets/assets/fonts/GT/GTWalsheimPro-Black.ttf": "91b97c525173993747ec7da3c2c57d0b",
"assets/assets/fonts/league-spartan-master/webfonts/leaguespartan-bold.ttf": "7cc8cbbd7a330c0d1e7c08c6d62711e4",
"assets/assets/fonts/samarkan/SAMAN___.TTF": "8107f8b787a40a84fbf3ee220abd84aa",
"assets/assets/fonts/proxima_nova/ProximaNova-Thin.otf": "8f0bc01ce5e5becef482d277cb72b728",
"assets/assets/fonts/proxima_nova/ProximaNova-Bold.otf": "62d4d7d369292a9bf23762465ec6d704",
"assets/assets/fonts/proxima_nova/ProximaNova-Regular.otf": "410504d49238e955ba7dc23a7f963021"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
