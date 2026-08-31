(function(){
  "use strict";
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- LOADER ---------- */
  window.addEventListener('load', function(){
    var loader = document.getElementById('loader');
    setTimeout(function(){ loader.classList.add('hide'); }, reduceMotion ? 0 : 500);
  });
  // failsafe in case load event is slow
  setTimeout(function(){
    document.getElementById('loader').classList.add('hide');
  }, 3000);

  /* ---------- SCROLL PROGRESS + NAVBAR ---------- */
  var progressBar = document.getElementById('progress-bar');
  var navbar = document.getElementById('navbar');
  var ticking = false;

  function onScroll(){
    if(!ticking){
      window.requestAnimationFrame(function(){
        var h = document.documentElement;
        var scrollTop = h.scrollTop || document.body.scrollTop;
        var scrollHeight = (h.scrollHeight - h.clientHeight) || 1;
        var pct = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = pct + '%';
        navbar.classList.toggle('scrolled', scrollTop > 60);
        ticking = false;
      });
      ticking = true;
    }
  }
  document.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  /* ---------- MOBILE MENU ---------- */
  var hamburger = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobile-menu');
  var scrim = document.getElementById('scrim');
  function closeMenu(){
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    scrim.classList.remove('open');
    document.body.style.overflow = '';
  }
  function toggleMenu(){
    var opening = !mobileMenu.classList.contains('open');
    hamburger.classList.toggle('open', opening);
    mobileMenu.classList.toggle('open', opening);
    scrim.classList.toggle('open', opening);
    document.body.style.overflow = opening ? 'hidden' : '';
  }
  hamburger.addEventListener('click', toggleMenu);
  scrim.addEventListener('click', closeMenu);
  mobileMenu.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', closeMenu); });

  /* ---------- REVEAL ON SCROLL ---------- */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, {threshold:0.15, rootMargin:'0px 0px -8% 0px'});
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('in-view'); });
  }

  /* ---------- ACHIEVEMENT CARD ICON TRIGGER ---------- */
  var achCards = document.querySelectorAll('.ach-card');
  if('IntersectionObserver' in window){
    var ioAch = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){ entry.target.classList.add('in-view'); ioAch.unobserve(entry.target); }
      });
    }, {threshold:0.3});
    achCards.forEach(function(el){ ioAch.observe(el); });
  }

  /* ---------- TIMELINE DRAW + DOT ACTIVATION ---------- */
  var tlItems = document.querySelectorAll('.tl-item');
  var tlFill = document.getElementById('tl-fill');
  if('IntersectionObserver' in window && tlItems.length){
    var ioTl = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('in-view');
          var idx = Array.prototype.indexOf.call(tlItems, entry.target);
          var pct = ((idx + 1) / tlItems.length) * 100;
          tlFill.style.height = pct + '%';
        }
      });
    }, {threshold:0.4});
    tlItems.forEach(function(el){ ioTl.observe(el); });
  }

  /* ---------- PARALLAX BG SHAPES (desktop, motion allowed) ---------- */
  var floats = document.querySelectorAll('.bg-float.parallax');
  if(!reduceMotion && floats.length){
    document.addEventListener('scroll', function(){
      var st = window.pageYOffset;
      floats.forEach(function(el){
        var speed = parseFloat(el.getAttribute('data-speed')) || 0.2;
        el.style.transform = 'translateY(' + (st * speed) + 'px)';
      });
    }, {passive:true});
  }

  /* ---------- CURSOR (desktop, fine pointer only) ---------- */
  var cursor = document.getElementById('cursor-dot');
  var isFinePointer = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  if(isFinePointer && !reduceMotion){
    document.addEventListener('mousemove', function(e){
      cursor.style.transform = 'translate(' + e.clientX + 'px,' + e.clientY + 'px) translate(-50%,-50%)';
    });
    document.querySelectorAll('a, button, .chip, .project-card').forEach(function(el){
      el.addEventListener('mouseenter', function(){ cursor.classList.add('magnet'); });
      el.addEventListener('mouseleave', function(){ cursor.classList.remove('magnet'); });
    });
  } else if(cursor){
    cursor.style.display = 'none';
  }

  /* ---------- CONTACT FORM (Web3Forms, AJAX — works on any host) ---------- */
  var contactForm = document.getElementById('contact-form');
  if(contactForm){
    contactForm.addEventListener('submit', function(e){
      e.preventDefault();
      var btn = document.getElementById('contact-submit');
      var status = document.getElementById('contact-status');
      var data = new FormData(contactForm);

      btn.disabled = true;
      btn.style.opacity = '0.6';

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {'Accept': 'application/json'},
        body: data
      })
      .then(function(res){ return res.json(); })
      .then(function(json){
        if(json.success){
          status.textContent = "Thanks — your message is on its way. I'll get back to you soon.";
          status.style.color = 'var(--teal-dark)';
          status.style.display = 'block';
          contactForm.reset();
        } else {
          throw new Error(json.message || 'Submission failed');
        }
      })
      .catch(function(){
        status.textContent = "Something went wrong sending that. Please email me directly at sasidharan162005@gmail.com.";
        status.style.color = 'var(--coral)';
        status.style.display = 'block';
      })
      .finally(function(){
        btn.disabled = false;
        btn.style.opacity = '1';
      });
    });
  }

  /* ---------- PHOTO LIGHTBOX ---------- */
  var photoTrigger = document.getElementById('hero-photo-trigger');
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  var lightboxClose = document.getElementById('lightbox-close');
  if(photoTrigger && lightbox){
    var heroImgSrc = photoTrigger.querySelector('img').getAttribute('src');
    function openLightbox(){
      lightboxImg.setAttribute('src', heroImgSrc);
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeLightbox(){
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }
    photoTrigger.addEventListener('click', openLightbox);
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e){
      if(e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape') closeLightbox();
    });
  }

  /* ---------- SMOOTH ANCHOR SCROLL WITH NAVBAR OFFSET ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(e){
      var id = a.getAttribute('href');
      if(id.length < 2) return;
      var target = document.querySelector(id);
      if(!target) return;
      e.preventDefault();
      var offset = target.getBoundingClientRect().top + window.pageYOffset - 84;
      window.scrollTo({top:offset, behavior: reduceMotion ? 'auto' : 'smooth'});
    });
  });
})();
