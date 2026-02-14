/**
 * Default list of popular dating app identifiers.
 *
 * - iOS: URL schemes for use with canOpenURL / LSApplicationQueriesSchemes (max 50)
 * - Android: Package names for use with PackageManager
 */
export const defaultPlatformData = {
    ios: [
        // Tier 1 – Major apps (high confidence schemes)
        "tinder",
        "bumble",
        "badoo",
        "hinge",
        "grindr",
        "okcupid",
        "pof",
        "match",
        "happn",
        "coffeemeetsbagel",
        // Tier 2 – Popular niche
        "feeld",
        "zoosk",
        "eharmony",
        "hermobile", // HER
        "theleague",
        "hily",
        "taimi",
        "clover",
        // Tier 3 – LGBTQ+
        "scruff",
        "jackd",
        "hornet",
        "blued",
        // Tier 4 – Specialty / Regional
        "dilmil",
        "meetme",
        "chispa",
        "blk",
        "stir",
        "jdate",
        "christianmingle",
        "seeking",
        "tantan",
        "momochat", // Momo
        "soul",
        "azar",
        "wink",
        "sweetring",
        "innercircle",
        "luxy",
        "raya",
        "snack",
        "loxclub",
        // User-requested
        "thursday",
        "boo",
        "loop",
        "iris",
        "bumpy",
        // European / global
        "lovoo",
        "meetic",
        "tagged",
        "skout",
    ],
    android: [
        // Tier 1 – Major apps
        "com.tinder",
        "com.bumble.app",
        "com.badoo.mobile",
        "co.hinge.app",
        "com.grindr.android",
        "com.okcupid.okcupid",
        "com.pof.android",
        "com.match.android.matchmobile",
        "com.ftw_and_co.happn",
        "com.coffeemeetsbagel",
        // Tier 2 – Popular niche
        "co.feeld",
        "com.zoosk.zoosk",
        "com.eharmony",
        "com.weareher.her",
        "com.league.theleague",
        "com.hily.app",
        "com.taimi",
        "com.clover.dating",
        // Tier 3 – LGBTQ+
        "com.appspot.scruffapp",
        "mobi.jackd.android",
        "com.hornet.android",
        "com.soft.blued",
        // Tier 4 – Specialty / Regional
        "co.dilmil.dilmil",
        "com.myYearbook.myYearbook", // MeetMe
        "com.chispa.app",
        "com.blk.app",
        "com.stir.app",
        "com.jdate.jdate",
        "com.spark.cmingle", // Christian Mingle
        "com.reflex.seeking",
        "com.p1.mobile.putong", // Tantan
        "com.immomo.momo",
        "cn.soulapp.android",
        "com.azarlive.android",
        "com.wink.android",
        "com.sweetring",
        "com.theinnercircle",
        "com.luxy.millionaire",
        // Raya is iOS-only
        "com.snack.dating",
        "com.loxclub",
        // User-requested
        "com.honeypot", // Thursday
        "enterprises.dating.boo",
        "me.loopmein.app", // Loop
        "com.idealmatch.idma", // Iris Dating
        "app.bumpy.android",
        // European / global
        "net.lovoo.android",
        "com.meetic.android",
        "com.taggedapp",
        "com.skout.android",
    ],
};
//# sourceMappingURL=datingApps.js.map