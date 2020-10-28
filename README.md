# CSS 이름 규칙
## <hr> **css 파일 첫부분에 작성**<hr>
```
@charset "utf-8";

/*-------------------------------------------------------------
    File   : Layout.css
    Author : Gildong, Hong 2017-07
    CSS 적용순서 : 아이디 > 태그와 클래스 > 클래스 > 태그
    CSS 선택자 선언순서 : Type Selector, Layout Selector, Class Selector, Etc
    CSS 속성 선언순서 : display, position(top, right, bottom, left, z-index), float/clear, overflow, width/height, margin/padding(top, right, bottom, left),
    border(top, right, bottom, left), background(image,position,repeat,color), border-radius, box-shadow,
    font(font-weight, font-style, font-variant, font-size/line-height, font-family), opacity, cursor, box-sizing, etc
/*-------------------------------------------------------------
```
## <hr> **작은 따옴표(' ') 사용범위** <hr>
- 폰트의 선언, filter, content에 작은 따옴표('')를 사용한다. 그 외의 경우는 사용하지 않는다.
```
.class-name {font-family:'dotum';}
.filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='img.png', sizingMethod='scale';}
.class-name:after{content:'.'}
.class-name {background:url(img.gif) no-repeat}
```
## <hr> **공백의 사용**
- 선택자 간, 중괄호간 한칸의 공백을 사용한다, 중괄호 안쪽 좌우에는 공백은 사용하지 않는다.

> ### 잘못된 예시
```
.class-name, .class-name .child-class{background:url(../img/img.gif) no-repeat}
.class-name {padding:0; margin:0}
.class-name { padding:0;margin:0 }
```
> ### 올바른 예시
```
.class-name,
.class-name .child-class {background:url(../img/img.gif) no-repeat;}
.class-name {padding:0;margin:0;}
.class-name {padding:0;margin:0;}
```

## <hr> **시작 이름은 영문 대문자, 숫자, 특수문자로 시작할 수 없다.** <hr>
> ### 잘못된 예시

    abc_def.html
    *test_obj
    123-image.jpg

> ### 올바른 예시

    box-select

## <hr>**네이밍의 조합은 형태/의미/순서_상태를 기본순서로 사용**<hr>
> ### 잘못된 예시

    select-button
    checked-textbox

> ### 올바른 예시

    button-select
    textbox-checked

## <hr>**네이밍 규칙의 언더스코어(_) 조합은 파일, 폴더, 이미지에 사용**<hr>
> ### 잘못된 예시

    customerService

> ### 올바른 예시

    customer_service

## <hr>**네이밍 규칙의 하이픈(-) 조합은CSS 네이밍에 사용하는 것을 권장한다. HTML 문서 안에서 언더스코어(_)의 조합은 form, input 엘리먼트등의 name 어트리뷰트의 값을 사용하는 것을 권장한다. 이유는 클래스 네임이 서버사이드 스크립트의 변수와 자바스크립트의 변수 정의시 혼돈을 방지하기 위함이다.**<hr>

> ### 잘못된 예시

    hidden_obj

> ### 올바른 예시

    hidden-obj

## <hr>**1, 2과 같은 한자리 정수는 사용하지 않으며 01, 02과 같이 사용하며 사용을 권장한다. 대부분의 파일관리 유틸리티 프로그램들을 사용하여 파일의 이름으로 정렬할 때에 정렬의 순서를 보장하기 위함이다.**<hr>

> ### 잘못된 예시

    cyber_center_1
    cyber_center_2
    box-type01
    box-type02 
    box-type03

> ### 올바른 예시

    cyber_center_01
    cyber_center_02
    box-type
    box-type02
    box-type03

## <hr>**BEM 명명 규칙**<hr>
- 하이픈(-) 명명 규칙 + 추가적인 규칙
> ### B (Block)
-  기본적인 component를 나타낸다.
```
.stick-man
{
}
```
> ### E (Elements)
- 요소(Element)를 나타낸다.
- Component를 이루고 있는 구성요소를 표현할 때 사용
- Component(B) 이름 뒤에 2개의 밑줄(__)을 사용하여 명명한다.
```
.stick-man__head
{
}

.stick-man__arms
{
}
```
> ### M (Modifier)
- 수정(Modifier)을 나타낸다.
-  stick-man이 blue 또는 red를 가질 수 있다면
- component를 수정한다는 의미로, component명 뒤에 하이픈 두개(--)를 사용하여 명명한다.
```
.stick-man--blue 
{
}
.stick-man--red 
{
}
```
- component가 아니라, 요소(element)도 수정할 수 있다.
```
.stick-man__head--small 
{
}
.stick-man__head--big 
{
}
```
## <hr> **js- class 이름 사용하기**<hr>
 - 버그를 경감시키는 한 가지 방법으로 DOM 요소와의 관계를 나타내기 위해 js-* 클래스 명을 사용합니다.
 ```
 //the CSS code
 <div class="site-navigation js-site-navigation">
 </div>

 //the Javasript code 
 const nav = document.querySelector('.js-site-navigation')
 ```

![Alt text](https://media.vlpt.us/post-images/naynara/87f6abe0-a1ea-11e9-992c-0deb201020b9/.jpg)

![Alt text](https://media.vlpt.us/post-images/naynara/8027ec30-a1ea-11e9-992c-0deb201020b9/3.jpg)

![Alt text](https://media.vlpt.us/post-images/naynara/85886b00-a1ea-11e9-992c-0deb201020b9/2.jpg)