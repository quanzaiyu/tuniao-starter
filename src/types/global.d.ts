
import type { Uni as _Uni } from '@dcloudio/types';

// 参考：https://blog.csdn.net/HuafuCsdn/article/details/130883161
declare global {
  /**
   * 拓展全局变量window
   */
  interface Window {
    app: any;
  }

  interface Date {
    getYear: () => number;
  }

  /**
   * 拓展全局变量import.meta
   */
  interface ImportMeta {
    env: any;
    globEager: any;
  }

  /**
   * 拓展全局变量uni
   */
  interface Uni extends _Uni {
    app: any;
    $store: any;
  }
}
