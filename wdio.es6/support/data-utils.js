import _ from 'lodash'

export class dataUtil {
    static regExpEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }
    
    static replaceAll(haystack, needle, replaceWith, caseSensitive = false) {
        let regexModifiers;
    
        if(caseSensitive == true)
            regexModifiers = "igm";
        else 
            regexModifiers = 'gm';
    
        let regex = new RegExp(dataUtil.regExpEscape(needle), regexModifiers);
        haystack = haystack.replace(regex, replaceWith);
          
        return haystack;
    }
    
    static removeFileExtension (filename) {
        let filesplit = filename.split('.');
        filesplit.pop();
        return _.reduce(filesplit, (curr, next)=> `${curr}.${next}`);
    }
    
    static retrieveFilenameFromPath(filepath) {
        let filename = _.last(filepath.split('/'));
        return dataUtil.removeFileExtension(filename);
    }
}