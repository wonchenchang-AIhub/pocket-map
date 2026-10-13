'use strict';
const fs=require('node:fs');
const path=require('node:path');
const policy=require('../privacy-policy.js');
const root=path.resolve(__dirname,'..');
const read=file=>fs.readFileSync(file,'utf8').replace(/^\uFEFF/,'');
const source=read(process.argv[2] ? path.resolve(process.argv[2]) : path.join(root,'places.json'));
const match=source.match(/const DATA\s*=\s*(\[[\s\S]*?\]);/);
const original=JSON.parse(match?match[1]:source);
const clean=policy.filter(original);
fs.writeFileSync(path.join(root,'places.json'),JSON.stringify(clean,null,2)+'\n');
const file=path.join(root,'地圖收藏清冊.html');
let html=read(file);
html=html.replace(/const DATA\s*=\s*\[[\s\S]*?\];/,()=>`const DATA=${JSON.stringify(clean)};`);
html=html.replace(/const CATS=(.*?);/,(_,json)=>`const CATS=${JSON.stringify(Object.fromEntries(Object.entries(JSON.parse(json)).filter(([k])=>policy.allowed.includes(k))))};`);
html=html.replace('「生活服務」與「其他（僅地址）」兩類已移除。','只保留餐飲、景點與住宿類；購物、生活服務、地址及其他個人收藏已排除。');
fs.writeFileSync(file,html);
console.log(`更新完成：保留 ${clean.length} 筆，排除 ${original.length-clean.length} 筆。`);
// No raw source copies or excluded record names are saved or logged.
