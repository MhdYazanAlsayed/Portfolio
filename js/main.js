/**
 * طبقتا نجوم (خلف/أمام) مع عمق وهمي:
 * - نجوم خلفية كبيرة أقل عدداً وبطيئة
 * - نجوم أمامية أصغر وأكثر عدداً وأسرع
 * - انجراف تلقائي + بارالاكس لطيف مع الماوس
 * - إيقاف عند الخلفية لتوفير البطارية
 */

class Starfield {
  constructor(canvas, opts) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.count = opts.count ?? 400;
    this.speed = opts.speed ?? 0.02; // سرعة انجراف
    this.parallax = opts.parallax ?? 0.05;
    this.sizeRange = opts.sizeRange ?? [0.5, 1.8];
    this.twinkle = opts.twinkle ?? 0.15;

    this.vw = innerWidth;
    this.vh = innerHeight;
    this.dpr = Math.min(devicePixelRatio || 1, 1.5); // تقليل DPR للأداء
    this.stars = [];
    // Mouse position variables removed for performance optimization

    // تحسينات الأداء - تقليل FPS للنجوم الثابتة
    this.frameCount = 0;
    this.lastFrameTime = 0;
    this.targetFPS = 15; // تقليل FPS أكثر للنجوم الثابتة
    this.frameInterval = 1000 / this.targetFPS;

    this.resize();
    this.init();
    this._raf = null;
    this._hidden = false;

    addEventListener("resize", () => this.onResize());
    // Mouse movement removed for performance optimization - stars are now static
  }

  rand(min, max) {
    return Math.random() * (max - min) + min;
  }
  init() {
    const { vw, vh } = this;
    this.stars = Array.from({ length: this.count }, () => ({
      x: Math.random() * vw,
      y: Math.random() * vh,
      z: Math.random(), // عمق (0-1)
      r: this.rand(this.sizeRange[0], this.sizeRange[1]),
      a: this.rand(0.6, 1.0), // alpha base - زيادة الشفافية
      phi: Math.random() * Math.PI * 2, // طور الوميض
    }));

    // تأكد من وجود نجوم مرئية
    console.log(`تم إنشاء ${this.stars.length} نجمة في طبقة النجوم`);
  }

  resize() {
    const { canvas, ctx } = this;
    this.vw = innerWidth;
    this.vh = innerHeight;
    const d = this.dpr;
    canvas.width = this.vw * d;
    canvas.height = this.vh * d;
    canvas.style.width = this.vw + "px";
    canvas.style.height = this.vh + "px";
    ctx.setTransform(d, 0, 0, d, 0, 0);
  }
  onResize() {
    this.resize();
  }

  lerp(a, b, t) {
    return a + (b - a) * t;
  }

  draw(now) {
    // تحكم في معدل الإطارات للأداء - تقليل التحديث للنجوم الثابتة
    if (now - this.lastFrameTime < this.frameInterval * 2) {
      // تقليل معدل التحديث للنصف
      return;
    }
    this.lastFrameTime = now;

    const { ctx, vw, vh, stars } = this;
    // خلفية شفافة: نمسح فقط
    ctx.clearRect(0, 0, vw, vh);

    for (const s of stars) {
      // استخدام المواضع الأصلية للنجوم بدون حركة
      const starX = s.x;
      const starY = s.y;

      // وميض مبسط فقط (بدون حركة)
      const tw = (Math.sin(now * 0.001 + s.phi) * 0.3 + 0.7) * this.twinkle;
      const alpha = Math.max(0.2, Math.min(1, s.a - tw));

      // رسم نجمة مبسطة للأداء
      this.drawOptimizedStar(ctx, starX, starY, s, alpha, now);
    }
    ctx.globalAlpha = 1;
  }

  drawOptimizedStar(ctx, x, y, star, alpha, now) {
    const { r, z } = star;
    const size = Math.max(0.3, r * (0.5 + (1 - z) * 0.6));

    // ألوان مبسطة للنجوم
    const starColors = ["#ffffff", "#b3d9ff", "#ffcc99"];
    const colorIndex = Math.floor(star.z * starColors.length);
    const starColor = starColors[colorIndex];

    // وميض مبسط
    const twinkle = Math.sin(now * 0.002 + star.phi) * 0.2 + 0.8;
    const finalAlpha = alpha * twinkle;

    ctx.globalAlpha = finalAlpha;
    ctx.fillStyle = starColor;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();

    // هالة بسيطة للنجوم الكبيرة فقط
    if (size > 1.0 && finalAlpha > 0.5) {
      ctx.globalAlpha = finalAlpha * 0.1;
      ctx.beginPath();
      ctx.arc(x, y, size * 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  drawRealisticStar(ctx, x, y, star, alpha, now) {
    const { r, z } = star;
    const size = Math.max(0.3, r * (0.5 + (1 - z) * 0.8));

    // ألوان النجوم الواقعية
    const starColors = [
      "#ffffff", // أبيض
      "#b3d9ff", // أزرق فاتح
      "#ffcc99", // برتقالي فاتح
      "#ffb3d9", // وردي فاتح
      "#ccffcc", // أخضر فاتح
      "#ffffcc", // أصفر فاتح
    ];

    // اختيار لون عشوائي للنجمة
    const colorIndex = Math.floor(star.z * starColors.length);
    const starColor = starColors[colorIndex];

    // وميض النجمة
    const twinkle = Math.sin(now * 0.003 + star.phi) * 0.3 + 0.7;
    const finalAlpha = alpha * twinkle;

    ctx.globalAlpha = finalAlpha;

    // رسم النجمة الأساسية
    ctx.fillStyle = starColor;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();

    // رسم هالة حول النجوم الكبيرة
    if (size > 1.2) {
      const haloSize = size * 2.5;
      const haloAlpha = finalAlpha * 0.15;

      // إنشاء تدرج للهالة
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, haloSize);
      gradient.addColorStop(0, starColor + "40");
      gradient.addColorStop(0.5, starColor + "20");
      gradient.addColorStop(1, starColor + "00");

      ctx.globalAlpha = haloAlpha;
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, haloSize, 0, Math.PI * 2);
      ctx.fill();
    }

    // رسم خطوط الضوء للنجوم الساطعة
    if (size > 0.8 && finalAlpha > 0.6) {
      ctx.globalAlpha = finalAlpha * 0.4;
      ctx.strokeStyle = starColor;
      ctx.lineWidth = 0.5;

      // خطوط متقاطعة
      ctx.beginPath();
      ctx.moveTo(x - size * 3, y);
      ctx.lineTo(x + size * 3, y);
      ctx.moveTo(x, y - size * 3);
      ctx.lineTo(x, y + size * 3);
      ctx.stroke();
    }

    // تأثير التلألؤ للنجوم الصغيرة
    if (size < 0.8) {
      const sparkle = Math.sin(now * 0.005 + star.phi * 2) * 0.5 + 0.5;
      if (sparkle > 0.7) {
        ctx.globalAlpha = sparkle * finalAlpha;
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(x, y, size * 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  start() {
    const loop = (t) => {
      if (!this._hidden) {
        this.draw(t);
        this._raf = requestAnimationFrame(loop);
      }
    };
    this._raf = requestAnimationFrame(loop);

    // تحسين الأداء - إيقاف عند عدم الرؤية
    document.addEventListener("visibilitychange", () => {
      this._hidden = document.hidden;
      if (!this._hidden && !this._raf) {
        this.start();
      }
      if (this._hidden && this._raf) {
        cancelAnimationFrame(this._raf);
        this._raf = null;
      }
    });

    // تحسين الأداء - تقليل السرعة عند التمرير بدلاً من الإيقاف
    let scrollTimeout;
    let isScrolling = false;
    this.originalTargetFPS = this.targetFPS;

    window.addEventListener(
      "scroll",
      () => {
        if (!isScrolling) {
          isScrolling = true;
          this.targetFPS = 15; // تقليل FPS عند التمرير
          this.frameInterval = 1000 / this.targetFPS;
        }

        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          isScrolling = false;
          this.targetFPS = this.originalTargetFPS; // استعادة FPS الأصلي
          this.frameInterval = 1000 / this.targetFPS;
        }, 150);
      },
      { passive: true }
    );
  }
}

/* إنشاء طبقتين */
const backCanvas = document.getElementById("stars-back");
const frontCanvas = document.getElementById("stars-front");

if (backCanvas && frontCanvas) {
  const back = new Starfield(backCanvas, {
    count: 100, // تقليل عدد النجوم أكثر للأداء
    speed: 0, // إيقاف الحركة تماماً
    parallax: 0, // إيقاف البارالاكس
    sizeRange: [0.8, 2.0],
    twinkle: 0.08, // زيادة الوميض قليلاً للتعويض
  });

  const front = new Starfield(frontCanvas, {
    count: 200, // تقليل عدد النجوم أكثر للأداء
    speed: 0, // إيقاف الحركة تماماً
    parallax: 0, // إيقاف البارالاكس
    sizeRange: [0.5, 1.2],
    twinkle: 0.15, // زيادة الوميض قليلاً للتعويض
  });

  back.start();
  front.start();

  console.log("تم تشغيل نظام النجوم بنجاح!");
} else {
  console.error("لم يتم العثور على عناصر الكانفاس للنجوم!");
}
