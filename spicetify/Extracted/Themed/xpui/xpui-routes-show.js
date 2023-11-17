"use strict";(("undefined"!=typeof self?self:global).webpackChunkopen=("undefined"!=typeof self?self:global).webpackChunkopen||[]).push([[5713],{47854:(e,t,a)=>{a.d(t,{V:()=>B,e:()=>D});var i=a(59496),s=a(55411),n=a(97533),o=a(94895),r=a(46721),l=a(88818),c=a(66948),u=a(94564),d=a(60644),g=a(58895),p=a(24020),m=a(23694),h=a(38441),x=a(64832),y=a(51009),j=a(11892),b=a(27099),k=a(27815),f=a(17294),v=a(39314),P=a(99714),C=a(12171),S=a(70933),w=a(30549),N=a(80295),I=a(76456),E=a(84811),A=a(54940),R=a(4637);function D(e){return{uri:e.uri,name:e.name,trailer:e.trailer,showTypes:e.showTypes}}const U=e=>`activation-trigger-mme-${e}`,B=i.memo((function({index:e=-1,showMetadata:t,episode:a,usePlayContextItem:B,status:F,variant:M}){const T=(0,E.E)(),O=a.playedState.playPositionMilliseconds,L=a.uri,z=(0,i.useRef)(null),[_,W]=(0,i.useState)(a.playedState.state===N.sY.Completed),G=(0,x.O)(),K=(0,j.g)(),Y=(0,C.jh)(),H=(0,y.o)(),X=(0,s.I0)(),{UBIFragment:V,spec:q,logger:Z}=(0,w.fU)(o.createDesktopEpisodeBlockEventFactory,{data:{uri:L,reason:a.requestId||"",position:e}}),$=(0,w.Wi)(q),{isActive:J,isPlaying:Q,togglePlay:ee}=B({uri:L}),[te]=(0,S.z)(1e4,(e=>e?.item?.uri===L));(0,i.useEffect)((()=>{Q&&(z.current=te)}),[Q,te]),(0,i.useEffect)((()=>{!Q&&z.current&&a.duration.milliseconds<=z.current&&W(!0)}),[Q,a.duration.milliseconds]);const ae=(0,i.useCallback)((e=>{e||(z.current=0),W(e)}),[]),ie=e=>{if(e.target!==e.currentTarget)return;const i=`${a.name} • ${t.name}`;G(e,[L],i,t.uri)},se=D(t),ne=(0,b.s)({...a,coverArt:{sources:a.coverArt}},se),oe=(0,i.useCallback)((()=>{if(a.episodeType===N.Wf.Episode&&T)m.y.set((()=>({triggerId:U(a.uri),triggerAction:null})));else if(K)ne();else{let e;e=Q?q.playButtonFactory().hitPause({itemToBePaused:L}):J?q.playButtonFactory().hitResume({itemToBeResumed:L}):q.playButtonFactory().hitPlay({itemToBePlayed:L});const t=Z.logInteraction(e);H({targetUri:L,intent:Q?"pause":"play",type:"click"}),ee({loggingParams:t})}}),[J,ne,H,ee,L,Q,K,a,T,Z,q]),re=(0,i.useCallback)((()=>{Z.logInteraction(q.hitUiNavigate({destination:L})),H({type:"click",targetUri:L,intent:"navigate"})}),[L,H,Z,q]),le=a.podcastSubscription?.isPaywalled??!1,ce=a.podcastSubscription?.isUserSubscribed??!1,ue=le&&!ce,de=le&&K,{badges:ge}=(0,I.r)({contentRating:a.contentRating?.label,isPaywalled:le}),pe=(0,i.useCallback)((()=>X((0,l.RM)(t.uri))),[t.uri,X]),me=(0,i.useCallback)((e=>{let i=e;return(ue||de)&&(i=(0,R.jsx)(p.l,{enabled:!0,showUri:t.uri,children:i})),!a.playability.playable&&ge.nineteen&&(i=(0,R.jsx)("div",{onClick:e=>{e.stopPropagation(),pe()},children:e})),i=(0,R.jsx)(c.D,{id:U(L),targetURI:(0,r.EC)(L),children:i}),i}),[L,ue,de,t.uri,ge.nineteen,a.playability.playable,pe]),he=(0,n.W6)(A.eli,{loadingValue:!1});return(0,R.jsx)(V,{spec:q,children:(0,R.jsx)(P.ZP,{value:"row",index:e,children:(0,R.jsx)(k._,{onShow:()=>{Z.logInteraction(q.secondaryHitUiReveal())},menu:(0,R.jsx)(u.k,{uri:L,showUri:t.uri,sharingInfo:a.sharingInfo,isPlayed:_,onMarkAsPlayed:ae}),children:he?(0,R.jsx)(g.k,{ref:$,requestId:a.requestId,index:e,uri:L,size:Y,images:a.coverArt||[],name:a.name,showName:t.name,description:a.description,isPlayable:a.playability.playable||ue,fullyPlayed:_,durationMs:a.duration.milliseconds,releaseDate:a.releaseDate?.isoString||"",resumePositionMs:z.current??O,handleDragStart:ie,handlePlaybackClick:oe,handleClick:re,isCurrentlyPlaying:J,isPaywalled:le,isUserSubscribed:ce,isPlaying:Q,position:Q?te:void 0,episodeSharingInfo:a.sharingInfo,onMarkAsPlayed:ae,contentInformation:a.contentInformation,badges:(0,R.jsxs)(R.Fragment,{children:[ge.explicit&&(0,R.jsx)(f.N,{}),ge.paid&&(0,R.jsx)(h.g,{}),ge.nineteen&&(0,R.jsx)(v.X,{size:16})]}),playButtonWrapper:me,onMoreButtonClick:()=>{Z.logInteraction(q.moreButtonFactory().hitUiReveal())},status:F,variant:M}):(0,R.jsx)(d.X,{ref:$,requestId:a.requestId,index:e,uri:L,size:Y,images:a.coverArt||[],name:a.name,showName:t.name,description:a.description,isPlayable:a.playability.playable||ue,fullyPlayed:_,durationMs:a.duration.milliseconds,releaseDate:a.releaseDate?.isoString||"",resumePositionMs:z.current??O,handleDragStart:ie,handlePlaybackClick:oe,handleClick:re,isCurrentlyPlaying:J,isPaywalled:le,isUserSubscribed:ce,isPlaying:Q,position:Q?te:void 0,episodeSharingInfo:a.sharingInfo,onMarkAsPlayed:ae,contentInformation:a.contentInformation,badges:(0,R.jsxs)(R.Fragment,{children:[ge.explicit&&(0,R.jsx)(f.N,{}),ge.paid&&(0,R.jsx)(h.g,{}),ge.nineteen&&(0,R.jsx)(v.X,{size:16})]}),playButtonWrapper:me,onMoreButtonClick:()=>{Z.logInteraction(q.moreButtonFactory().hitUiReveal())},status:F,variant:M})})})})}))},20103:(e,t,a)=>{a.r(t),a.d(t,{default:()=>Za});var i=a(59496),s=a(31752),n=a(83475),o=a(37148),r=a(46721),l=a(13803),c=a(94190),u=a(29360),d=a(84875),g=a.n(d),p=a(55411),m=a(2988),h=a(97533),x=a(60443),y=a(37756),j=a(4786),b=a(7168),k=a(79710),f=a(51009),v=a(44473),P=a(2147),C=a(12439),S=a(78479),w=a(67618);const N="_yl4tOZxcpoUt28k6B8I",I="lcJflizNrSwDM9yPNk6h",E="ret7iHkCxcJvsZU14oPY";var A=a(4637);const R=({rating:e,className:t,onClick:a})=>{if(!e)return null;const i=Boolean(e.rating?.rating);return(0,A.jsxs)("button",{className:g()(N,t),onClick:a,children:[(0,A.jsx)(m.D,{dir:"auto",variant:"mestoBold",children:e.averageRating?.showAverage?l.ag.formatNumber(e.averageRating.average,{maximumFractionDigits:1}):l.ag.get("web-player.audiobooks.noRating")}),i?(0,A.jsx)(S.u,{iconSize:16,className:g()(I)}):(0,A.jsx)(w.G,{iconSize:16,className:g()(I)}),e.averageRating?.showAverage&&(0,A.jsxs)(m.D,{variant:"mesto",className:g()(E),children:["(",l.ag.formatNumberCompact(Number(e.averageRating.totalRatings)),")"]})]})};var D=a(39877),U=a(16838),B=a(11874);const F="SpVoh9vvBN0kIwzfCiBh",M="nsGHaEmn310z9W4RMbb8",T="PfYVlZzroXSurDmS_kxY",O="kCT99_BcJQtW47mEfVF6",L="gmDgEbPyRXNixmjYAT9f",z="XlZGcb86bItwlMPQ2jOf",_="VGTtqfOlX2jIbpff6mPP",W="aexqooSgfdW95poEaxjH",G="Fui2wGupk4F1Khigbrhj",K="jWcvSz47NFpbLjnkFT1O",Y="Oo6MP8F01W5uGlnw8dag";var H=a(23882),X=a(38104),V=a(17294),q=a(39314),Z=a(56353),$=a(76456),J=a(84373);let Q=function(e){return e.SMALL="small",e.LARGE="large",e}({});const ee=({images:e,title:t,contentRating:a,duration:i,moreButton:s,onClick:n,onContextMenu:o,onTouchStart:r,onTouchEnd:l,isPlaying:c,isActive:u,size:d,className:p,label:h,isPlayable:x=!0})=>{const y=d===Q.LARGE?"medium":"small",{badges:j}=(0,$.r)({contentRating:a});return(0,A.jsxs)("div",{"data-testid":"trailer-component",className:g()(F,p,{[M]:u}),onContextMenu:o,onTouchStart:r,onTouchEnd:l,children:[(0,A.jsxs)("div",{className:O,children:[(0,A.jsxs)("div",{className:W,children:[(0,A.jsx)(D.O,{type:B.p.EPISODE,title:t,className:g()(_,{[Y]:d===Q.SMALL,[K]:d===Q.LARGE}),size:U.m$.SIZE_56,images:e,shape:D.K.ROUNDED_CORNERS}),(0,A.jsx)("div",{className:G,children:(0,A.jsx)(J.f,{"data-testid":"trailer-play-button",version:H.ul.transparent,size:y,isPlaying:c,onClick:n,disabled:!x})})]}),(0,A.jsxs)("div",{children:[(0,A.jsx)("div",{className:L,children:(0,A.jsx)(m.D,{dir:"auto",className:T,variant:"balladBold",children:t})}),(0,A.jsxs)("div",{className:z,children:[(0,A.jsx)(Z.V,{text:h}),j.explicit&&(0,A.jsx)(V.N,{}),j.nineteen&&(0,A.jsx)(q.X,{}),(0,A.jsx)(m.D,{dir:"auto",variant:"mesto",children:(0,A.jsx)(X.nL,{durationMs:i})})]})]})]}),s]})};var te=a(12171),ae=a(36207),ie=a(67674),se=a(52228),ne=a(60527),oe=a(30549),re=a(24347);const le=({htmlDescription:e,narrators:t,spec:a})=>{const s=(0,f.o)(),n=(0,oe.$P)(),o=(0,i.useCallback)((e=>{s({intent:"expand-description",type:"click"});const t=a.seeMoreButtonFactory();n.logInteraction(e?t.hitUiReveal():t.hitUiHide())}),[n,s,a]);return(0,A.jsxs)(A.Fragment,{children:[t.length?(0,A.jsx)(m.D,{as:"p",variant:"ballad",children:l.ag.get("web-player.audiobooks.narratedByX",t.join(l.ag.getSeparator()))}):null,e&&(0,A.jsx)(re.o,{maxLines:4,content:e,htmlContent:e,onExpanded:o})]})};var ce=a(43840),ue=a(35373),de=a(99120),ge=a(66839);const pe=i.memo((function({uri:e,size:t=ge.q.md,className:a,onClick:s}){const[n,o]=(0,de.Z)(e),r=(0,f.o)(),l=(0,i.useCallback)((()=>{r({targetUri:e,intent:n?"unsave":"save",type:"click"}),o(!n)}),[r,e,n,o]);return(0,A.jsx)(ge.o,{className:a,isFollowing:n,onFollow:l,onClick:s,uri:e,size:t})}));var me=a(94176);const he="8px",xe="mmCZ5VczybT9VqKB5wFU",ye="At_ihDspJfh1yw3Cn2cq",je="u3LLJx1KnMchfNCzi6k5",be="Yqz1Nv6wj1n3HmXL_qji",ke="qRqn3JrWLPbGW9k2a63n",fe="HAah1_lK_dHgyyE71I8Z",ve="eiC4nh70nb5UHZBYMgNA",Pe="hl2eRCaYcZ1Jm1bgNYlU",Ce="eYtmwXEvi1UdCevg8WoK",Se="QOp2aYTYmZHZ6DFFHuYE",we=({explicit:e,durationMs:t,publishDate:a})=>(0,A.jsxs)("div",{className:Ce,children:[e&&(0,A.jsx)(V.N,{fullText:!0}),(0,A.jsxs)("div",{children:[a&&(0,A.jsx)(m.D,{variant:"mesto",className:Se,children:l.ag.formatDate(a)}),(0,A.jsx)(m.D,{variant:"mesto",children:(0,A.jsx)(X.nL,{durationMs:t})})]})]});var Ne=a(6068),Ie=a(5779),Ee=a(99952),Ae=a(85830),Re=a(43030),De=a(3555),Ue=a(11892),Be=a(65401);const Fe="iZut9Dh2KEjNVhDUxzWw";function Me({uri:e,price:t,size:a,spec:i,logger:s,onPlayback:n}){const o=(0,Be.k)(),r=(0,Ue.g)(),c=0===t?.finalPrice?.amount,u=c?i.getButtonFactory({uri:e}):i.buyButtonFactory({uri:e}),d=(0,Ae.y1)((async()=>{if(s.logInteraction(u.hitShowPaywall({paywalledItem:e})),r)n();else{try{t?.finalPrice?await(0,De.Q)({show_uri:e,currency:t.finalPrice.currency,price:t.finalPrice.amount}):o(l.ag.get("error.generic"))}catch(e){o(l.ag.get("error.generic"))}n()}}),2e3,{leading:!0,trailing:!1});return(0,A.jsx)(Re.D,{size:a,className:Fe,style:{flexShrink:0},onClick:d,children:c?l.ag.get("web-player.audiobooks.buyFree"):l.ag.get("web-player.audiobooks.buy")})}const Te=({uri:e,isLocked:t,price:a,isPlaying:i,isConsumptionCapped:s,onPlayback:n,logger:o,spec:r,size:l="large"})=>t&&!s?(0,A.jsx)(Me,{size:l,uri:e,price:a,logger:o,spec:r,onPlayback:n}):(0,A.jsx)(Ee.$,{size:l,isPlaying:i,uri:e,onClick:n});var Oe=a(53565),Le=a(45239),ze=a(6838),_e=a(56067);const We=i.memo((function({backgroundColor:e,uri:t,name:a,isPlaying:s,togglePlay:n,isLocked:o,showDownloadButton:r,consumptionCapExplanation:c,price:u,spec:d,isExplicit:g,publishDate:m,duration:h}){const[x,y]=(0,de.Z)(t),b=!(0,_e.k)(),k=(0,p.I0)(),v=(0,f.o)(),P=(0,oe.$P)(),C=(0,i.useCallback)((()=>{v({targetUri:t,intent:x?"unsave":"save",type:"click"});const e=d.saveToLibraryButtonFactory();x?P.logInteraction(e.hitUnfollow({itemToBeUnfollowed:t})):P.logInteraction(e.hitFollow({itemToBeFollowed:t})),y(!x)}),[v,t,x,d,y,P]),S=(0,i.useCallback)(((e,a)=>{const i=d.downloadButtonFactory();c?k((0,Oe.S3)(c)):a===Ie.mc.ADD?P.logInteraction(i.hitDownload({itemToDownload:t})):a===Ie.mc.REMOVE?P.logInteraction(i.hitRemoveDownload({itemToRemoveFromDownloads:t})):a===Ie.mc.NO_PERMISSION&&P.logInteraction(i.hitUiReveal())}),[c,k,P,d,t]),w=(0,i.useCallback)((()=>{const e=d.contextButtonFactory().hitUiReveal();P.logInteraction(e)}),[P,d]),N=(0,ze.j)();return(0,A.jsxs)(ce.o,{backgroundColor:e,style:{"--action-bar-padding-bottom":he},children:[(0,A.jsx)(ce.F,{testId:"book-action-bar-metadata",children:(0,A.jsx)(we,{explicit:g,publishDate:m,durationMs:h})}),(0,A.jsxs)(ce.F,{children:[(0,A.jsx)(Te,{uri:t,isLocked:o,isConsumptionCapped:!!c,price:u,isPlaying:s,onPlayback:n,logger:P,spec:d,size:N}),(0,A.jsx)(Le.r,{children:(0,A.jsx)(ue.H,{isAdded:x,onClick:C,disabled:b,size:N,isAudiobook:!0})},"follow-button"),r&&(0,A.jsx)(pe,{uri:t,onClick:S,size:N}),(0,A.jsx)(Ne.ClickToggleContextMenu,{menu:(0,A.jsx)(me.X,{uri:t}),children:(0,A.jsx)(j.MoreButton,{label:l.ag.get("more.label.context",a),onClick:w,size:N})})]})]})}));var Ge=a(70424),Ke=a(86857),Ye=a(92142),He=a(5776),Xe=a(82578),Ve=a(54940);const qe=i.memo((function({coverArt:e,name:t,authorName:a,uri:i,backgroundColor:s,isPlaying:n,togglePlay:o,isLocked:r,price:c,isConsumptionCapped:u,logger:d,spec:g}){const p=(0,h.W6)(Ve.vyX,{loadingValue:!1});return(0,A.jsxs)(Ge.gF,{backgroundColor:s,children:[(0,A.jsxs)(Ke.W,{children:[(0,A.jsx)(Te,{uri:i,isLocked:r,price:c,isPlaying:n,isConsumptionCapped:u,onPlayback:o,logger:d,spec:g,size:"medium"}),(0,A.jsx)(Ye.i,{text:t,dragUri:i,dragLabel:t})]}),(0,A.jsx)(Ne._P,{menu:(0,A.jsx)(me.X,{uri:i}),children:(0,A.jsx)(Ge.Oz,{images:e,name:t,shape:p?D.K.SQUARE:D.K.ROUNDED_CORNERS})}),(0,A.jsxs)(Ge.sP,{children:[(0,A.jsx)(He.g,{children:l.ag.get("web-player.audiobooks.audiobook")}),(0,A.jsx)(Ge.xd,{canEdit:!1,onClick:()=>{},scaleAtMinWidth:Ge.vz,children:t}),(0,A.jsx)(Xe.m,{children:a})]})]})})),Ze="HvVxzh4ZoggYAhgSxSth",$e=i.memo((({price:e})=>e.finalPrice&&e.finalListPrice?0===e.finalPrice.amount&&0===e.finalListPrice.amount?(0,A.jsxs)("div",{className:Ze,children:[(0,A.jsx)(m.D,{variant:"cello",semanticColor:"textBase",children:l.ag.get("audiobook.freePriceDescription")}),(0,A.jsx)(m.D,{variant:"mesto",children:l.ag.get("audiobook.freePriceExplanation")})]}):(0,A.jsxs)("div",{className:Ze,children:[(0,A.jsx)(m.D,{variant:"canon",semanticColor:"textBase",children:e.finalPrice.formattedPrice}),e.finalPrice.amount<e.finalListPrice.amount&&(0,A.jsx)(m.D,{variant:"ballad",semanticColor:"textSubdued",children:l.ag.get("web-player.audiobooks.retailPrice",(0,A.jsx)("span",{style:{textDecoration:"line-through"},children:e.finalListPrice.formattedPrice}))})]}):null));var Je=a(32290),Qe=a(11851);var et=a(40692);var tt=a(31936),at=a(15494),it=a(70933);const st="b0Vng72SrQiFroJKXfk2",nt="FfeP3XKSZcAdfviyk8fv",ot="eWxDd0LanTnTlSl8SOHX",rt="eAOkseqV13_CAmzuDJpa",lt="fovofKIYdEIURgIYoKm2",ct="NXXFrQO7npgPCRuSKaAA",ut="ekkhhuxKVGAzkEmuh9kE",dt="zd6xqobF255bxHFtCmXy",gt=i.memo((function({name:e,duration:t,uri:a,bookName:s,usePlayContextItem:n,isChapterLocked:o,isPlayable:r,resumePositionMs:c,isFullyPlayed:u,isExplicit:d,is19PlusOnly:x,spec:y,index:k,consumptionCapExplanation:v}){const P=(0,i.useRef)(c),{isPlaying:C,togglePlay:S,isActive:w}=n({uri:a}),N=(0,oe.$P)(),I=(0,Ue.g)(),E=(0,p.I0)(),R=(0,h.W6)(Ve.vWw,{loadingValue:!1}),{position:D,isFullyPlayed:U}=((e,t,a,s)=>{const n=(0,i.useRef)(null),[o,r]=(0,i.useState)(s),[l]=(0,it.z)(1e4,(t=>t?.item?.uri===e));return(0,i.useEffect)((()=>{a&&(n.current=l)}),[a,l]),(0,i.useEffect)((()=>{!a&&n.current&&t.milliseconds<=n.current+1e4&&r(!0)}),[a,t.milliseconds]),{position:a?l:null,isFullyPlayed:o}})(a,t,C,u);null!==D&&(P.current=D);const B=(0,i.useCallback)((e=>{e.stopPropagation(),e.preventDefault()}),[]),F=(0,f.o)(),M=(0,i.useCallback)((e=>{if(B(e),v&&!I&&R)return void E((0,Oe.S3)(v));const t=y.chapterBlockFactory({position:k,uri:a}).playButtonFactory();if(o)F({type:"click",intent:"audiobook-gated-entry-point",itemIdSuffix:"target-chapter"}),N.logInteraction(t.hitShowPaywall({paywalledItem:a}));else{const e=(0,at.aK)({isPlaying:C,isActive:w,spec:t,logger:N,uri:a});S({loggingParams:e})}}),[v,E,k,R,w,I,o,C,N,F,y,B,S,a]),T=(0,i.useCallback)((()=>{const e=y.chapterBlockFactory({position:k,uri:a}).secondaryHitUiReveal();N.logInteraction(e)}),[k,N,y,a]),O=(0,i.useCallback)((e=>{B(e);const t=y.chapterBlockFactory({position:k,uri:a}).contextMenuFactory().hitUiReveal();N.logInteraction(t)}),[k,N,y,B,a]),L=(0,i.useMemo)((()=>!(o||v)),[v,o]),z=(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)("hr",{className:ot,"aria-hidden":!0}),(0,A.jsxs)("div",{className:st,onDoubleClick:e=>{F({targetUri:a,intent:"play",type:"double-click"}),M(e)},children:[(0,A.jsx)(m.D,{as:"h2",variant:"balladBold",className:g()(ct,{[nt]:w}),semanticColor:"textBase",children:e}),(0,A.jsxs)("div",{className:ut,children:[(0,A.jsx)(J.f,{size:"small",version:J.u.secondary,onClick:M,isPlaying:C,ariaPlayLabel:l.ag.get("tracklist.a11y.play",e,s),ariaPauseLabel:l.ag.get("tracklist.a11y.pause",e,s),locked:o&&!v,disabled:!r&&!(o||v)}),d&&(0,A.jsx)(V.N,{fullText:!0}),x&&(0,A.jsx)(q.X,{size:16}),(0,A.jsx)("div",{className:dt,children:(0,A.jsx)(tt.E,{isPlaying:C,fullyPlayed:U,durationMs:t.milliseconds,resumePositionMs:P.current,position:D??void 0})})]}),L?(0,A.jsx)(Ne.ClickToggleContextMenu,{menu:(0,A.jsx)(b.r,{uri:a}),children:(0,A.jsx)(j.MoreButton,{className:lt,size:j.q.sm,label:l.ag.get("more.label.context",e),onClick:O,condensedAll:!0})}):null]})]});return L?(0,A.jsx)(Ne._P,{menu:(0,A.jsx)(b.r,{uri:a}),onShow:T,children:(0,A.jsx)("div",{className:rt,children:z})}):(0,A.jsx)("div",{className:rt,children:z})}));var pt=a(82783),mt=a(62962),ht=a(38441),xt=a(56961),yt=a(30408);const jt="XG_S4BkuyAMohXFLGKU1",bt="NrMNU3Sf4iy2c6JJx7R8",kt="n8V7RFwuVx9PaIT1n_mA",ft="kTtB_Y_yizhUj6SMYY8e",vt="f2XS5sEjEtvk4TdlzHK3",Pt="d9YBRXX3qqxAD43sqNzE",Ct="Jvp5er4UpzTljUao_SrR",St="EQCGoB4MqhFPtwUwp1rh",wt="UTBQUpUwOPb37ou2ULmH",Nt="Dnwv7PC1vjXvcwYEfqqf",It=i.memo((function({name:e,duration:t,uri:a,bookName:s,usePlayContextItem:n,isChapterLocked:o,isPlayable:r,resumePositionMs:c,isFullyPlayed:u,isExplicit:d,is19PlusOnly:m,spec:x,index:y,consumptionCapExplanation:k}){const v=(0,i.useRef)(c),{isPlaying:P,togglePlay:C,isActive:S}=n({uri:a}),w=(0,oe.$P)(),N=(0,Ue.g)(),I=(0,p.I0)(),E=(0,h.W6)(Ve.vWw,{loadingValue:!1}),R=(0,xt.Y)((e=>{if(e?.item?.uri===a){const t=(0,yt.k)(e)??0;return v.current=t,t}return 0})),D=(0,i.useCallback)((e=>{e.stopPropagation(),e.preventDefault()}),[]),U=(0,f.o)(),B=(0,i.useCallback)((e=>{if(D(e),k&&!N&&E)return void I((0,Oe.S3)(k));const t=x.chapterBlockFactory({position:y,uri:a}).playButtonFactory();if(o)U({type:"click",intent:"audiobook-gated-entry-point",itemIdSuffix:"target-chapter"}),w.logInteraction(t.hitShowPaywall({paywalledItem:a}));else{const e=(0,at.aK)({isPlaying:P,isActive:S,spec:t,logger:w,uri:a});C({loggingParams:e})}}),[k,I,y,E,S,N,o,P,w,U,x,D,C,a]),F=(0,i.useCallback)((()=>{const e=x.chapterBlockFactory({position:y,uri:a}).secondaryHitUiReveal();w.logInteraction(e)}),[y,w,x,a]),M=(0,i.useCallback)((e=>{D(e);const t=x.chapterBlockFactory({position:y,uri:a}).contextMenuFactory().hitUiReveal();w.logInteraction(t)}),[y,w,x,D,a]),T=!(o||k),O=(0,A.jsx)(pt.g,{className:g()({[bt]:S}),children:e}),L=(0,A.jsxs)("div",{className:Pt,children:[o?(0,A.jsx)(ht.g,{}):null,d&&(0,A.jsx)(V.N,{fullText:!0}),m&&(0,A.jsx)(q.X,{size:16}),(0,A.jsx)("div",{className:Ct,children:(0,A.jsx)(tt.E,{isPlaying:P,fullyPlayed:u,durationMs:t.milliseconds,resumePositionMs:v.current,position:P?R:void 0})})]}),z=(0,A.jsxs)("div",{className:wt,children:[(0,A.jsx)("div",{className:Nt,children:T?(0,A.jsx)(Ne.ClickToggleContextMenu,{menu:(0,A.jsx)(b.r,{uri:a}),children:(0,A.jsx)(j.MoreButton,{className:vt,size:j.q.xs,label:l.ag.get("more.label.context",e),onClick:M})}):null}),(0,A.jsx)("div",{className:St,children:(0,A.jsx)(J.f,{size:"small",version:J.u.secondary,onClick:B,isPlaying:P,ariaPlayLabel:l.ag.get("tracklist.a11y.play",e,s),ariaPauseLabel:l.ag.get("tracklist.a11y.pause",e,s),locked:o&&!k,disabled:!r&&!(o||k)})})]}),_=(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)("hr",{className:kt,"aria-hidden":!0}),(0,A.jsx)(mt.w,{id:`chapter-${y}`,title:O,body:L,footer:z,onDoubleClick:e=>{U({targetUri:a,intent:"play",type:"double-click"}),B(e)},className:jt})]});return T?(0,A.jsx)(Ne._P,{menu:(0,A.jsx)(b.r,{uri:a}),onShow:F,children:(0,A.jsx)("div",{className:ft,children:_})}):(0,A.jsx)("div",{className:ft,children:_})})),Et=({bookUri:e,bookName:t,sampleUri:a,isFinishedUnlockingJourney:s,usePlayContextItem:n,spec:o,consumptionCapExplanation:r})=>{const l=function(e,t){const a=(0,Qe.z)();return(0,i.useCallback)((async(i,s)=>a.getBookContents(e,{offset:i,limit:s,doRefreshSubscription:t})),[t,a,e])}(e,s),c=(0,i.useRef)(!1),u=(0,i.useRef)(0),d=(0,h.W6)(Ve.eli,{loadingValue:!1}),[g,p]=(0,i.useState)([]),m=(0,i.useCallback)((e=>e?.uri===a),[a]),x=(0,i.useCallback)((e=>(e=>null!==e)(e)&&!m(e)),[m]),y=(0,i.useCallback)((()=>{l&&(c.current||null===u.current||(c.current=!0,l(u.current,50).then((e=>{c.current=!1,u.current=e.nextOffset,e.items.length>0&&p((t=>t.concat(e.items.filter(x))))}))))}),[l,x]);return(0,i.useEffect)((()=>{u.current=0,p([])}),[e]),(0,A.jsx)("ul",{children:(0,A.jsx)(Je.C,{onReachBottom:y,triggerOnInitialLoad:!0,children:g.map(((e,a)=>{const{name:i,duration:s,uri:l,playability:{playable:c},playedState:{playPositionMilliseconds:u,state:g},isExplicit:p,is19PlusOnly:m}=e,h=function(e){return!e.playability?.playable&&(e.playability?.reason===et.WY.PaymentRequired||e.playability?.reason===et.WY.Anonymous)}(e);return d?(0,A.jsx)(It,{name:i,duration:s,uri:l,bookName:t,usePlayContextItem:n,isPlayable:c,isChapterLocked:h,consumptionCapExplanation:r,resumePositionMs:u,isFullyPlayed:g===et.sY.Completed,isExplicit:p,is19PlusOnly:m,spec:o,index:a},l):(0,A.jsx)(gt,{name:i,duration:s,uri:l,bookName:t,usePlayContextItem:n,isPlayable:c,isChapterLocked:h,consumptionCapExplanation:r,resumePositionMs:u,isFullyPlayed:g===et.sY.Completed,isExplicit:p,is19PlusOnly:m,spec:o,index:a},l)}))})})};var At=a(90643),Rt=a(60352),Dt=a(80290),Ut=a(59737),Bt=a(25258);const Ft="QEd1L2SSRW1ol_sQQN6m",Mt="ENuWK8u3C9kmadnqkErf",Tt="i0gSVhns0PjhiUKm4OG1",Ot="jKVb6K0dga3SfW1dp2Pg",Lt="MOpV0_YizQER2NksxLju",zt="vrR8bh9DvivyDfUrh1vD",_t="_toO3CqMPAPTbny7Rh8R",Wt="Iudw61HRePwOAJpbDRvA",Gt="GWaz1n1SADn9enzKdi_Z",Kt=i.memo((function({coverArt:e,toggleModal:t,uri:a,isBook:i}){const s=(0,Ut.X)(e,{desiredSize:320}),{spec:n,logger:r}=(0,oe.fU)(Rt.createDesktopPodcastRatingEventFactory,{data:{identifier:i?o.Wg.RATINGS_AND_REVIEWS_RATINGS_AUDIOBOOK:o.Wg.RATINGS_AND_REVIEWS_RATINGS,uri:a}});return(0,A.jsx)(Bt.Z,{contentLabel:"podcast-rating-modal",isOpen:!0,onRequestClose:t,children:(0,A.jsxs)("div",{className:Ft,children:[(0,A.jsxs)("div",{className:Tt,children:[(0,A.jsx)(m.D,{as:"h1",variant:"canon",className:_t,children:i?l.ag.get("web-player.audiobooks.rating.rateAudiobook"):l.ag.get("web-player.show.rating.header")}),(0,A.jsxs)("button",{className:Ot,onClick:()=>{const e=n.closeButtonFactory().hitUiNavigateBack();r.logInteraction(e),t()},children:[(0,A.jsx)(At.k,{role:"presentation"}),(0,A.jsx)("span",{className:"hidden-visually",children:l.ag.get("web-player.audiobooks.rating.closeModal")})]})]}),(0,A.jsxs)("div",{className:Lt,children:[(0,A.jsx)(Dt.Ee,{loading:"eager",src:s?.url,className:Mt}),(0,A.jsxs)("div",{className:zt,children:[(0,A.jsx)(m.D,{as:"p",variant:"cello",className:Wt,children:i?l.ag.get("web-player.audiobooks.rating.wantToRate"):l.ag.get("web-player.show.rating.want-to-rate")}),(0,A.jsx)(m.D,{as:"p",className:Gt,children:l.ag.get("web-player.audiobooks.rating.goToApp")}),(0,A.jsx)(Re.D,{colorSet:"invertedLight",onClick:()=>{const e=n.okButtonFactory().hitUiNavigateBack();r.logInteraction(e),t()},children:l.ag.get("web-player.audiobooks.rating.ok")})]})]})]})})})),Yt={shuffle:!1,repeat:se.zq.REPEAT_NONE},Ht=i.memo((function({metadata:e}){const{uri:t,coverArt:a,name:n,htmlDescriptionPlain:r,authorName:u,sample:d,narrators:S,rating:w,isExplicit:N,duration:I,copyrights:E,publishDate:D,price:U,isLocked:B,consumptionCapExplanation:F,signifierText:M,latestPlayedEpisodeLink:T,topics:O}=e,{search:L}=(0,s.TH)(),z=!!new URLSearchParams(L).get("isUnlockingAudiobook"),_=!(!(0,ae.D)(z)||z),W=(0,Ue.g)(),G=(0,v.Z)(a[0]?.url),K=(0,p.I0)(),[Y,H]=(0,i.useState)(!1),X=(0,f.o)(),V=(0,h.W6)(Ve.vWw,{loadingValue:!1}),{spec:q,logger:Z}=(0,oe.fU)(x.createDesktopAudiobookEventFactory,{data:{uri:t,identifier:o.Wg.PODCAST_SHOW_AUDIOBOOK}}),{spec:$,logger:J}=(0,oe.fU)(x.createDesktopAudiobookEventFactory,{data:{uri:t,identifier:o.Wg.RATINGS_AND_REVIEWS_RATINGS_AUDIOBOOK}}),{spec:se,logger:re}=(0,oe.fU)(y.createDesktopLockedAudiobookEventFactory,{data:{uri:t,identifier:o.Wg.PODCAST_SHOW_AUDIOBOOK}}),ce=(0,i.useMemo)((()=>q.actionBarFactory()),[q]),ue=(0,i.useMemo)((()=>$.aboutSectionFactory()),[$]),de=(0,i.useMemo)((()=>q.chapterListFactory()),[q]);(0,i.useEffect)((()=>{X({type:"view",intent:"audiobook"})}),[X]),(0,i.useEffect)((()=>{B&&re.logImpression(se.impression())}),[se,re,B]);const{isPlaying:ge,togglePlay:pe,usePlayContextItem:me,isActive:he,triggerPlay:Ce}=(0,ie.n)({uri:t},{featureIdentifier:"audiobook"}),{togglePlay:Se,isPlaying:we,isActive:Ne}=(0,ie.n)({uri:d?.uri??""},{featureIdentifier:"audiobook"}),Ie=ge&&!we,Ee=he&&!Ne,Ae=(0,i.useCallback)((async()=>{const e=q.actionBarFactory().playButtonFactory();if(F&&!W&&V)return Z.logInteraction(e.hitShowPaywall({paywalledItem:t})),void K((0,Oe.S3)(F));if(!B||W)if(W)pe(Yt);else{const a=(0,at.aK)({isPlaying:Ie,isActive:Ee,spec:e,logger:Z,uri:t});Ee?pe({...Yt,loggingParams:a}):Ce({...Yt,skipTo:T?{uri:T}:void 0,loggingParams:a})}}),[q,F,W,V,B,Z,t,K,pe,Ie,Ee,Ce,T]),Re=(0,i.useCallback)((()=>{d?.uri&&(X({targetUri:d.uri,intent:we?"play":"pause",type:"click"}),Se())}),[we,X,Se,d?.uri]),De=(0,i.useCallback)((()=>{const e=ue.ratingButtonFactory().hitUiReveal();J.logInteraction(e),H((e=>!e))}),[ue,J]),Be=(0,te.jh)(),Fe=B&&!F&&U;return(0,A.jsxs)("section",{className:xe,children:[(0,A.jsx)(c.$,{children:(0,ne.Od)({showOrAudiobookName:n,type:"Audiobook"})}),(0,A.jsx)(qe,{name:n,authorName:u,uri:t,coverArt:a,backgroundColor:G,togglePlay:Ae,isPlaying:Ie,isLocked:B,isConsumptionCapped:!!F,price:U,logger:Z,spec:q.actionBarFactory()}),(0,A.jsx)(We,{name:n,backgroundColor:G,uri:t,togglePlay:Ae,isPlaying:Ie,isLocked:B,showDownloadButton:!B||!!F,consumptionCapExplanation:F,isExplicit:N,duration:I,publishDate:D,price:U,spec:ce}),(0,A.jsxs)("div",{className:g()(ye,"contentSpacing",{[je]:Be===te.Uo.LARGE}),children:[(0,A.jsxs)("div",{className:be,children:[(0,A.jsxs)("div",{className:Pe,children:[M&&(0,A.jsx)(m.D,{variant:"ballad",as:"p",semanticColor:"textBrightAccent",children:M}),!M&&Fe&&(0,A.jsx)($e,{price:U})]}),(0,A.jsx)(le,{htmlDescription:r,narrators:S,spec:ue})]}),(0,A.jsxs)("div",{className:ke,children:[d?.isPlayable&&(0,A.jsx)(ee,{label:l.ag.get("audiobook.page.sample"),images:d.coverArt,title:d.name,duration:d.duration.milliseconds,moreButton:B?null:(0,A.jsx)(P.y,{menu:(0,A.jsx)(b.r,{uri:d.uri}),children:(0,A.jsx)(j.MoreButton,{})}),onClick:Re,isPlaying:we,isActive:Ne,size:Q.LARGE,contentRating:d.contentRating?.label,isPlayable:d.isPlayable}),(0,A.jsx)("div",{className:fe,children:(0,A.jsx)(R,{rating:w,onClick:De})}),O.length>0&&(0,A.jsx)(k.v,{topics:O})]}),(0,A.jsxs)("div",{className:ve,children:[(0,A.jsx)(Et,{bookUri:t,bookName:n,sampleUri:d?.uri,isFinishedUnlockingJourney:_,usePlayContextItem:me,spec:de,consumptionCapExplanation:F},`${t}-${B}-${!!F}`),(0,A.jsx)(C.k,{copyrights:E})]})]}),Y&&(0,A.jsx)(Kt,{toggleModal:()=>H(!1),coverArt:a,uri:t,isBook:!0})]})}));var Xt=a(14350),Vt=a(61586),qt=a(14934),Zt=a(15613),$t=a(94559);const Jt=({uri:e,name:t,backgroundColor:a,spec:s})=>{const n=(0,oe.$P)(),o=(0,f.o)(),r=!(0,_e.k)(),[c,u]=(0,de.Z)(e),d=(0,i.useCallback)((()=>{o({targetUri:e,intent:c?"unsave":"save",type:"click"});const t=s.followButtonFactory();n.logInteraction(c?t.hitUnfollow({itemToBeUnfollowed:e}):t.hitFollow({itemToBeFollowed:e})),u(!c)}),[o,e,c,s,n,u]),g=(0,i.useCallback)((()=>{n.logInteraction(s.contextButtonFactory().hitUiReveal())}),[n,s]),p=(0,ze.j)();return(0,A.jsx)(ce.o,{backgroundColor:a,children:(0,A.jsxs)(ce.F,{children:[(0,A.jsx)(Le.r,{children:(0,A.jsx)($t.e,{isFollowing:c,onClick:d,disabled:r})},"follow-button"),(0,A.jsx)(P.y,{menu:(0,A.jsx)(Zt.M,{uri:e}),onShow:g,children:(0,A.jsx)(j.MoreButton,{label:l.ag.get("more.label.context",t),size:p})})]})})},Qt=(0,i.lazy)((()=>a.e(2765).then(a.bind(a,62765))));function ea(e){return(0,h.W6)(Ve.$f6)?(0,A.jsx)(i.Suspense,{fallback:!0,children:(0,A.jsx)(Qt,{...e})}):null}var ta=a(94564),aa=a(27099),ia=a(27815),sa=a(92953),na=a(47854),oa=a(99714),ra=a(58547);const la=(0,i.createContext)({setSortState:()=>{throw new Error("setSortState must be used within a ShowFilterProvider")},sortState:[]}),ca=i.memo((function({uri:e,children:t}){return(0,A.jsx)(ra.r,{uri:e,defaultState:[],sortContext:la,localStorageKey:"showFilterParams-v2",children:t})}));var ua=a(5686);const da={field:ua.ay.PUBLISH_DATE,order:ua.i5.DESC},ga={field:ua.ay.PUBLISH_DATE,order:ua.i5.ASC},pa={episodic:da,sequential:ga,recent:da};function ma(){return new Map([[da,{key:"newest-to-oldest",value:l.ag.get("shows.sort.newest-to-oldest")}],[ga,{key:"oldest-to-newest",value:l.ag.get("shows.sort.oldest-to-newest")}]])}function ha(e){return pa[e]}const xa=(0,i.createContext)({setSortState:()=>{throw new Error("setSortState must be used within a ShowSortProvider")},sortState:ha("recent")}),ya=e=>{const t=ma();return Array.from(t.keys()).some((({field:t})=>t===e?.field))},ja=i.memo((function({uri:e,children:t,defaultSortParam:a}){return(0,A.jsx)(ra.r,{uri:e,defaultState:a,sortContext:xa,localStorageKey:"showSortParam",validator:ya,children:t})})),ba="cJJXVm4gQW6AdfCQRhpX",ka="hTRqaN61SDG95erQGMmx",fa={totalCount:0,nextOffset:0,items:[]},va=i.memo((function({showMetadata:e,usePlayContextItem:t}){const{sortState:a}=(0,i.useContext)(xa),{sortState:s}=(0,i.useContext)(la),n=(0,sa.ZM)(e.uri,a,s),[o,r]=(0,i.useState)(fa),l=(0,i.useRef)(!1),c=(0,i.useRef)(0),u=(0,i.useCallback)(((e=!1)=>{if(!n)return;const t=c.current;null!==t&&(l.current||(l.current=!0,n(t,50).then((a=>{r((i=>{const s=e?[]:[...i.items];return s.splice(t,a.items.length,...a.items),c.current=a.nextOffset,{...a,items:s}})),l.current=!1}))))}),[n]);return(0,i.useEffect)((()=>{r(fa)}),[e.uri]),(0,i.useEffect)((()=>{c.current=0,u(!0)}),[u]),(0,A.jsx)(oa.ZP,{value:"track-list",children:(0,A.jsx)(Je.C,{onReachBottom:u,triggerOnInitialLoad:!0,children:o.items.map(((a,i)=>a&&(0,A.jsxs)("div",{className:ka,children:[(0,A.jsx)("hr",{className:ba,"aria-hidden":!0}),(0,A.jsx)(na.V,{index:i,episode:a,showMetadata:e,usePlayContextItem:t},`${a.uri}/${i}`)]},`${i}${a.uri}`)))})})}));var Pa=a(11836);const Ca={field:ua.YG.ISPLAYED,operator:ua.NK.EQUALS,value:!1},Sa={field:ua.YG.STARTEDPLAYING,operator:ua.NK.GREATER_THAN,value:0};const wa="all-episodes",Na=({onFilter:e})=>{const{sortState:t,setSortState:a}=(0,i.useContext)(la),s=new Map([[Ca,{key:"is-played",value:l.ag.get("shows.filter.unplayed")}],[Sa,{key:"started-playing",value:l.ag.get("shows.filter.in-progress")}]]),n=Array.from(s.values());n.unshift({key:wa,value:l.ag.get("mwp.podcast.all.episodes")});const o=Array.from(s.keys()),r=(0,i.useCallback)((t=>{if(t===wa)a([]);else{const e=o.find((e=>s.get(e)?.key===t));e&&a([e])}e()}),[e,a,o,s]);if(!s.size||!o)return null;let c=n[0];const u=Array.from(s.entries()).filter((e=>t?.some((t=>t.field===e[0].field&&t.operator===e[0].operator))));return u.length>0&&(c=u[0][1]),(0,A.jsx)(Pa.A,{options:n,onSelect:e=>r(e),selected:c,variant:"balladBold",semanticColor:"textBase",heading:l.ag.get("drop_down.filter_by")})},Ia=({onSort:e})=>{const{sortState:t,setSortState:a}=(0,i.useContext)(xa),s=ma(),n=Array.from(s.values()),o=Array.from(s.keys()),r=(0,i.useCallback)((t=>{const i=o.find((e=>s.get(e)?.key===t));i&&a(i),e()}),[o,e,s,a]);if(!s.size||!t)return null;const c=Array.from(s.keys()).find((e=>e.field===t.field&&e.order===t.order));if(!c)return null;const u=s.get(c);return u?(0,A.jsx)(Pa.A,{options:n,onSelect:e=>r(e),selected:u,heading:l.ag.get("drop_down.sort_by")}):null},Ea="show-showPage-sectionWrapper",Aa="TYB4Y2xQujO7cifhHush",Ra="sSXKiPRvp2AHmwfHoCCS",Da="YJlizbhw6DBPHT9OYbdj",Ua="TfjbWiK8hca4HHEBnonP",Ba="kR0M2WSYVUj4cohADSFM",Fa="ghfuv80I8uW_ymG_jfx9",Ma="jtfSxoRam9rzTtdXIjzc",Ta="fejGrhq7pxGC99cUdyVw",Oa="T0OjvsNXAJJGd23eBG2m",La="Ppm5YkDdE5ktTPwZC1Dw",za="urKYEVZPj2k0hwDT1qzt",_a=({spec:e})=>{const t=(0,oe.$P)(),{canSort:a,canFilter:s}=(0,sa.zZ)().capabilities,n=(0,i.useCallback)((()=>{t.logInteraction(e.episodeListFactory().filterButtonFactory().hitFilter())}),[t,e]),o=(0,i.useCallback)((()=>{t.logInteraction(e.episodeListFactory().sortButtonFactory().hitSort())}),[t,e]);return(0,A.jsxs)("div",{className:Ba,children:[s&&(0,A.jsx)("div",{className:Ma,children:(0,A.jsx)(Na,{onFilter:n})}),!s&&(0,A.jsx)(m.D,{as:"h3",variant:"canon",semanticColor:"textBase",className:Ta,children:l.ag.get("mwp.podcast.all.episodes")}),a&&(0,A.jsx)("div",{className:Fa,children:(0,A.jsx)(Ia,{onSort:o})})]})},Wa=e=>{switch(e){case et.it.TRAILER:return l.ag.get("podcasts.next-episode.trailer");case et.it.UP_NEXT:return l.ag.get("podcasts.next-episode.up-next");case et.it.CONTINUE_LISTENING:return l.ag.get("podcasts.next-episode.continue-listening");case et.it.FIRST_PUBLISHED:return l.ag.get("podcasts.next-episode.first-published");case et.it.LATEST_PUBLISHED:return l.ag.get("podcasts.next-episode.latest-published");default:return}},Ga=({breakpoint:e,metadata:t,showId:a,spec:s})=>{const{uri:n,trailer:o,topics:r,description:c,htmlDescription:u,coverArt:d,rating:p}=t,x=(0,oe.$P)(),y=(0,i.useMemo)((()=>s.episodeListFactory()),[s]),[b,v]=(0,i.useState)(!1),S=(0,h.W6)(Ve.VzO),w=(0,f.o)(),N=(0,Ue.g)(),{sortState:I}=(0,i.useContext)(xa),{sortState:E}=(0,i.useContext)(la),D=(0,sa.zZ)(),{usePlayContextItem:U}=(0,ie.n)({uri:n,metadata:{[se.sb.SORTING_CRITERIA]:D.getPlayerSort(I),[se.sb.FILTERING_PREDICATE]:D.getPlayerFilter(E)}},{featureIdentifier:"show"}),{isActive:B,isPlaying:F,togglePlay:M}=U({uri:o?.uri||""}),T=(0,i.useCallback)((e=>{w({intent:"expand-description",type:"click"});const t=s.aboutSectionFactory().seeMoreButtonFactory(),a=e?t.hitUiReveal():t.hitUiHide();x.logInteraction(a)}),[x,w,s]),O=(0,i.useCallback)(((e,t)=>{const a=s.aboutSectionFactory().topicFactory(t).hitUiNavigate({destination:t.uri});x.logInteraction(a)}),[x,s]),L=o?{name:o.name,uri:o.uri,audio:{items:o.audio.items.map((e=>({url:e.url})))}}:null,z=(0,na.e)(t),_=(0,aa.s)(L,z),W=(0,i.useCallback)((()=>{o?.uri&&(N?_():(w({targetUri:o.uri,intent:F?"play":"pause",type:"click"}),M()))}),[_,N,F,w,M,o?.uri]),{ref:G,breakpoint:K}=(0,te.Db)({[te.Uo.MEDIUM]:0,[te.Uo.LARGE]:600}),Y=r.length>0,H=c||u,X=H||Y;return(0,A.jsxs)("div",{className:g()(Aa,"contentSpacing",{[Ra]:e===te.Uo.LARGE}),ref:G,children:[(0,A.jsxs)("div",{className:Da,children:[X&&(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)(m.D,{as:"h3",variant:"canon",semanticColor:"textBase",className:Ta,children:l.ag.get("artist.about")}),H&&(0,A.jsx)(re.o,{maxLines:4,content:(c||"").trim(),onExpanded:T,htmlContent:u||void 0}),p&&(0,A.jsx)("div",{className:za,children:(0,A.jsx)(R,{rating:p,onClick:()=>v(!0)})}),Y&&(0,A.jsx)(k.v,{topics:r,onClick:O})]}),(0,A.jsx)(ea,{showId:a,uri:n}),o&&!S&&(0,A.jsx)(ia._,{menu:(0,A.jsx)(ta.k,{uri:o.uri,showUri:n,sharingInfo:o.sharingInfo}),children:(0,A.jsx)(ee,{label:l.ag.get("track-trailer"),className:Oa,images:o.coverArt,title:o.name,duration:o.duration.milliseconds,moreButton:(0,A.jsx)(P.y,{menu:(0,A.jsx)(ta.k,{uri:o.uri,sharingInfo:o.sharingInfo,showUri:n}),children:(0,A.jsx)(j.MoreButton,{})}),onClick:W,isPlaying:F,isActive:B,size:Q.LARGE,contentRating:o.contentRating?.label})})]}),(0,A.jsx)(te.ZU.Provider,{value:K,children:(0,A.jsxs)("div",{className:Ua,"data-testid":"show-all-episode-list",children:[S&&t.nextBestEpisode&&(0,A.jsx)(na.V,{showMetadata:t,episode:t.nextBestEpisode.data,usePlayContextItem:U,status:Wa(t.nextBestEpisode.type),variant:"next-best-episode"}),(0,A.jsx)(_a,{spec:s}),(0,A.jsx)(oe.Nh,{spec:y,children:(0,A.jsx)(va,{showMetadata:t,usePlayContextItem:U})})]})}),(0,A.jsx)(C.k,{copyrights:[]}),b&&(0,A.jsx)(Kt,{toggleModal:()=>v(!1),coverArt:d,uri:n,isBook:!1})]})},Ka=i.memo(Ga);var Ya=a(31406);const Ha=({reason:e})=>{const t=(0,h.W6)(Ve.ALT),a=function(e){switch(e){case"OTP":return l.ag.get("podcasts.subscriber-indicator.otp");case"SUBSCRIPTION":return l.ag.get("podcasts.subscriber-indicator.subscription");default:return""}}(e);return t&&a?(0,A.jsx)(m.D,{className:La,children:a}):null};const Xa=({metadata:e,backgroundColor:t})=>{const{uri:a,coverArt:i,name:s,podcastType:n,publisherName:o,gatedContentAccessReason:r}=e,c=(0,h.W6)(Ve.vyX,{loadingValue:!1});return(0,A.jsxs)(Ge.gF,{backgroundColor:t,children:[(0,A.jsx)(Ke.W,{children:(0,A.jsx)(Ye.i,{text:s,dragUri:a,dragLabel:s})}),(0,A.jsx)(Ya.k,{children:(0,A.jsx)(ia._,{menu:(0,A.jsx)(Zt.M,{uri:a}),children:(0,A.jsx)(Ge.Oe,{loading:"eager",name:s,images:i,placeholderType:"show",shape:c?Ge.Kc.SQUARE:Ge.Kc.ROUNDED_CORNERS})})}),(0,A.jsxs)(Ge.sP,{children:[(0,A.jsxs)(He.g,{children:["SHOW"===n?l.ag.get("type.show"):l.ag.get("type.podcast"),r&&(0,A.jsx)(Ha,{reason:r})]}),(0,A.jsx)(ia._,{menu:(0,A.jsx)(Zt.M,{uri:a}),children:(0,A.jsx)(Ge.xd,{dragUri:a,dragLabel:s,scaleAtMinWidth:Ge.vz,children:(0,A.jsx)("span",{"data-testid":"show-title",children:s})})}),(0,A.jsx)(Xe.m,{children:o})]})]})};var Va=a(79911);const qa=({metadata:e,showId:t})=>{const{coverArt:a,name:s,uri:o}=e,{spec:r}=(0,oe.fU)(n.createDesktopPodcastEventFactory,{data:{uri:o}}),l=(0,i.useMemo)((()=>r.actionBarFactory()),[r]),u=(0,v.Z)(a[0]?.url||null),d=(0,te.jh)();return(0,A.jsxs)("section",{className:Ea,children:[(0,A.jsx)(c.$,{children:(0,ne.Od)({showOrAudiobookName:s,type:"Podcast"})}),(0,A.jsx)(Xa,{metadata:e,backgroundColor:u}),(0,A.jsx)(Jt,{uri:o,name:s,backgroundColor:u,spec:l}),(0,A.jsx)(Ka,{breakpoint:d,metadata:e,showId:t,spec:r})]})},Za=(0,i.memo)((function(){const{showId:e=""}=(0,s.UO)(),t=`spotify:show:${e}`,{data:a,error:n,redirectUri:c}=(0,qt.l)(t);if(c){const e=(0,r._b)(c);return(0,A.jsx)(Xt.InstrumentedRedirect,{to:e.toURLPath(!0)})}return!a||n?n instanceof Vt.E?(0,A.jsx)(u.h,{hasError:!0,errorMessage:l.ag.get("error-page.not-available-in-region.title")}):(0,A.jsx)(u.h,{hasError:!!n,errorMessage:l.ag.get("error.not_found.title.page")}):(0,et.l6)(a)?(0,A.jsx)(i.Suspense,{fallback:null,children:(0,A.jsx)(Va.C,{pageId:o.Wg.PODCAST_SHOW_AUDIOBOOK,uri:t,children:(0,A.jsx)(Ht,{metadata:a},`${!!a.consumptionCapExplanation}`)})}):(0,A.jsx)(i.Suspense,{fallback:null,children:(0,A.jsx)(Va.C,{pageId:o.Wg.PODCAST,uri:t,children:(0,A.jsx)(ca,{uri:a.uri,children:(0,A.jsx)(ja,{uri:a.uri,defaultSortParam:ha(a.consumptionOrder),children:(0,A.jsx)(qa,{showId:e,metadata:a})})})})})}))},12439:(e,t,a)=>{a.d(t,{k:()=>o});var i=a(2988);const s="rTMkDBDp47Eo12ZEQv4U";var n=a(4637);const o=({copyrights:e,courtesyLine:t})=>{const a=(e||[]).map(((e,t)=>{const a=e.text.replace(/^(\(C\)\s+)/,"").replace(/^(\(P\)\s+)/,"").replace(/^(©\s+)/,"").replace(/^(℗\s+)/,"");let s;return s="C"===e.type?"©":"P"===e.type?"℗":`(${e.type})`,(0,n.jsx)(i.D,{as:"p",variant:"finale",dir:"auto",children:`${s} ${a}`},t)}));return t&&a.unshift((0,n.jsx)(i.D,{as:"p",variant:"finale",dir:"auto",children:t},a.length)),(0,n.jsx)("div",{className:s,children:a})}}}]);
//# sourceMappingURL=xpui-routes-show.js.map